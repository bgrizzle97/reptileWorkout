import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  getDocs,
  deleteDoc,
  getDoc,
  Timestamp,
  serverTimestamp,
  limit
} from 'firebase/firestore';
import { db } from './firebase';
import { 
  SocialActivity, 
  Comment, 
  Leaderboard, 
  LeaderboardEntry,
  UserProfile 
} from '../types';
import { auth } from './firebase';
import { addNotification } from './users';

export interface SocialPost {
  id: string;
  userId: string;
  userDisplayName: string;
  userProfilePicture?: string;
  type: 'workout_completed' | 'achievement_unlocked' | 'personal_record' | 'goal_reached';
  title: string;
  description: string;
  data: any;
  likes: string[];
  comments: SocialComment[];
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SocialComment {
  id: string;
  userId: string;
  userDisplayName: string;
  userProfilePicture?: string;
  text: string;
  likes: string[];
  createdAt: Date;
}

export interface FriendRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  fromUserDisplayName: string;
  fromUserProfilePicture?: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

export interface Friend {
  id: string;
  userId: string;
  friendId: string;
  friendDisplayName: string;
  friendProfilePicture?: string;
  status: 'accepted';
  createdAt: Date;
}

class SocialService {
  private static instance: SocialService;

  static getInstance(): SocialService {
    if (!SocialService.instance) {
      SocialService.instance = new SocialService();
    }
    return SocialService.instance;
  }

  /**
   * Share a workout completion
   */
  async shareWorkout(workout: any, message?: string): Promise<string> {
    if (!auth.currentUser) throw new Error('User not authenticated');

    const post: Omit<SocialPost, 'id' | 'createdAt' | 'updatedAt'> = {
      userId: auth.currentUser.uid,
      userDisplayName: auth.currentUser.displayName || 'Anonymous',
      userProfilePicture: auth.currentUser.photoURL || undefined,
      type: 'workout_completed',
      title: `Just completed ${workout.name}! 💪`,
      description: message || `Crushed my workout with ${workout.sets?.length || 0} sets. Gains incoming!`,
      data: {
        workoutId: workout.id,
        workoutName: workout.name,
        duration: workout.duration,
        totalWeight: workout.totalWeight,
        exerciseCount: workout.sets?.length || 0,
      },
      likes: [],
      comments: [],
      isPublic: true,
    };

    const docRef = await addDoc(collection(db, 'social_posts'), {
      ...post,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return docRef.id;
  }

  /**
   * Share an achievement unlock
   */
  async shareAchievement(achievement: any, message?: string): Promise<string> {
    if (!auth.currentUser) throw new Error('User not authenticated');

    const post: Omit<SocialPost, 'id' | 'createdAt' | 'updatedAt'> = {
      userId: auth.currentUser.uid,
      userDisplayName: auth.currentUser.displayName || 'Anonymous',
      userProfilePicture: auth.currentUser.photoURL || undefined,
      type: 'achievement_unlocked',
      title: `Unlocked: ${achievement.title}! ${achievement.icon}`,
      description: message || `Just unlocked the ${achievement.title} achievement! ${achievement.reward ? `Reward: ${achievement.reward}` : ''}`,
      data: {
        achievementId: achievement.id,
        achievementTitle: achievement.title,
        achievementIcon: achievement.icon,
        reward: achievement.reward,
      },
      likes: [],
      comments: [],
      isPublic: true,
    };

    const docRef = await addDoc(collection(db, 'social_posts'), {
      ...post,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return docRef.id;
  }

  /**
   * Share a personal record
   */
  async sharePersonalRecord(exercise: string, weight: number, reps: number, message?: string): Promise<string> {
    if (!auth.currentUser) throw new Error('User not authenticated');

    const post: Omit<SocialPost, 'id' | 'createdAt' | 'updatedAt'> = {
      userId: auth.currentUser.uid,
      userDisplayName: auth.currentUser.displayName || 'Anonymous',
      userProfilePicture: auth.currentUser.photoURL || undefined,
      type: 'personal_record',
      title: `New PR: ${exercise}! 🏆`,
      description: message || `Just hit a new personal record: ${weight} lbs for ${reps} reps on ${exercise}!`,
      data: {
        exercise,
        weight,
        reps,
        previousPR: null, // Could be fetched from user's PR history
      },
      likes: [],
      comments: [],
      isPublic: true,
    };

    const docRef = await addDoc(collection(db, 'social_posts'), {
      ...post,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return docRef.id;
  }

  /**
   * Get social feed
   */
  async getSocialFeed(limitCount: number = 20): Promise<SocialPost[]> {
    if (!auth.currentUser) throw new Error('User not authenticated');

    try {
      const q = query(
        collection(db, 'social_posts'),
        where('isPublic', '==', true),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );

      const querySnapshot = await getDocs(q);
      const posts: SocialPost[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        posts.push({
          id: doc.id,
          ...data,
          createdAt: (data.createdAt as Timestamp).toDate(),
          updatedAt: (data.updatedAt as Timestamp).toDate(),
        } as SocialPost);
      });

      return posts;
    } catch (error: any) {
      console.error('Error getting social feed:', error);
      
      // Check if it's an index error
      if (error.code === 'failed-precondition' || error.code === 'unimplemented') {
        throw new Error('Database index not ready. Please try again in a few minutes.');
      }
      
      // Check if it's a permission error
      if (error.code === 'permission-denied') {
        throw new Error('Permission denied. Please check your authentication status.');
      }
      
      throw new Error(`Failed to load social feed: ${error.message}`);
    }
  }

  /**
   * Like/unlike a post
   */
  async toggleLike(postId: string): Promise<void> {
    if (!auth.currentUser) throw new Error('User not authenticated');

    const postRef = doc(db, 'social_posts', postId);
    const postDoc = await getDoc(postRef);

    if (!postDoc.exists()) throw new Error('Post not found');

    const post = postDoc.data() as SocialPost;
    const userId = auth.currentUser.uid;
    const likes = post.likes || [];

    if (likes.includes(userId)) {
      // Unlike
      await updateDoc(postRef, {
        likes: likes.filter(id => id !== userId),
        updatedAt: serverTimestamp(),
      });
    } else {
      // Like
      await updateDoc(postRef, {
        likes: [...likes, userId],
        updatedAt: serverTimestamp(),
      });
      // Notify post owner if not self
      if (post.userId !== userId) {
        await addNotification(post.userId, {
          type: 'post_like',
          message: `${auth.currentUser.displayName || 'Anonymous'} liked your post!`,
          relatedId: postId,
        });
      }
    }
  }

  /**
   * Add a comment to a post
   */
  async addComment(postId: string, text: string): Promise<string> {
    if (!auth.currentUser) throw new Error('User not authenticated');

    const comment: Omit<SocialComment, 'id' | 'createdAt'> = {
      userId: auth.currentUser.uid,
      userDisplayName: auth.currentUser.displayName || 'Anonymous',
      userProfilePicture: auth.currentUser.photoURL || undefined,
      text,
      likes: [],
    };

    const postRef = doc(db, 'social_posts', postId);
    const postDoc = await getDoc(postRef);

    if (!postDoc.exists()) throw new Error('Post not found');

    const post = postDoc.data() as SocialPost;
    const comments = post.comments || [];

    const newComment: SocialComment = {
      ...comment,
      id: Date.now().toString(), // Simple ID generation
      createdAt: new Date(),
    };

    await updateDoc(postRef, {
      comments: [...comments, newComment],
      updatedAt: serverTimestamp(),
    });
    // Notify post owner if not self
    if (post.userId !== auth.currentUser.uid) {
      await addNotification(post.userId, {
        type: 'post_comment',
        message: `${auth.currentUser.displayName || 'Anonymous'} commented on your post!`,
        relatedId: postId,
      });
    }
    return newComment.id;
  }

  /**
   * Send friend request
   */
  async sendFriendRequest(toUserId: string): Promise<string> {
    if (!auth.currentUser) throw new Error('User not authenticated');

    const request: Omit<FriendRequest, 'id' | 'createdAt'> = {
      fromUserId: auth.currentUser.uid,
      toUserId,
      fromUserDisplayName: auth.currentUser.displayName || 'Anonymous',
      fromUserProfilePicture: auth.currentUser.photoURL || undefined,
      status: 'pending',
    };

    const docRef = await addDoc(collection(db, 'friend_requests'), {
      ...request,
      createdAt: serverTimestamp(),
    });
    // Notify recipient
    await addNotification(toUserId, {
      type: 'friend_request',
      message: `${request.fromUserDisplayName} sent you a friend request!`,
      relatedId: docRef.id,
    });
    return docRef.id;
  }

  /**
   * Accept/reject friend request
   */
  async respondToFriendRequest(requestId: string, accept: boolean): Promise<void> {
    if (!auth.currentUser) throw new Error('User not authenticated');

    const requestRef = doc(db, 'friend_requests', requestId);
    const requestDoc = await getDoc(requestRef);

    if (!requestDoc.exists()) throw new Error('Friend request not found');

    const request = requestDoc.data() as FriendRequest;

    if (request.toUserId !== auth.currentUser.uid) {
      throw new Error('Not authorized to respond to this request');
    }

    if (accept) {
      // Accept the request
      await updateDoc(requestRef, { status: 'accepted' });

      // Add to friends collection
      await addDoc(collection(db, 'friends'), {
        userId: request.fromUserId,
        friendId: request.toUserId,
        friendDisplayName: auth.currentUser.displayName || 'Anonymous',
        friendProfilePicture: auth.currentUser.photoURL || undefined,
        status: 'accepted',
        createdAt: serverTimestamp(),
      });

      await addDoc(collection(db, 'friends'), {
        userId: request.toUserId,
        friendId: request.fromUserId,
        friendDisplayName: request.fromUserDisplayName,
        friendProfilePicture: request.fromUserProfilePicture,
        status: 'accepted',
        createdAt: serverTimestamp(),
      });
      // Notify sender
      await addNotification(request.fromUserId, {
        type: 'friend_accept',
        message: `${auth.currentUser.displayName || 'Anonymous'} accepted your friend request!`,
        relatedId: requestId,
      });
    } else {
      // Reject the request
      await updateDoc(requestRef, { status: 'rejected' });
    }
  }

  /**
   * Get friend requests
   */
  async getFriendRequests(): Promise<FriendRequest[]> {
    if (!auth.currentUser) throw new Error('User not authenticated');

    try {
      const q = query(
        collection(db, 'friend_requests'),
        where('toUserId', '==', auth.currentUser.uid),
        where('status', '==', 'pending'),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const requests: FriendRequest[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        requests.push({
          id: doc.id,
          ...data,
          createdAt: (data.createdAt as Timestamp).toDate(),
        } as FriendRequest);
      });

      return requests;
    } catch (error: any) {
      console.error('Error getting friend requests:', error);
      
      // Check if it's an index error
      if (error.code === 'failed-precondition' || error.code === 'unimplemented') {
        throw new Error('Database index not ready. Please try again in a few minutes.');
      }
      
      // Check if it's a permission error
      if (error.code === 'permission-denied') {
        throw new Error('Permission denied. Please check your authentication status.');
      }
      
      throw new Error(`Failed to load friend requests: ${error.message}`);
    }
  }

  /**
   * Get friends list
   */
  async getFriends(): Promise<Friend[]> {
    if (!auth.currentUser) throw new Error('User not authenticated');

    const q = query(
      collection(db, 'friends'),
      where('userId', '==', auth.currentUser.uid),
      where('status', '==', 'accepted')
    );

    const querySnapshot = await getDocs(q);
    const friends: Friend[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      friends.push({
        id: doc.id,
        ...data,
        createdAt: (data.createdAt as Timestamp).toDate(),
      } as Friend);
    });

    return friends;
  }

  /**
   * Remove friend
   */
  async removeFriend(friendId: string): Promise<void> {
    if (!auth.currentUser) throw new Error('User not authenticated');

    // Remove both friendship records
    const q1 = query(
      collection(db, 'friends'),
      where('userId', '==', auth.currentUser.uid),
      where('friendId', '==', friendId)
    );

    const q2 = query(
      collection(db, 'friends'),
      where('userId', '==', friendId),
      where('friendId', '==', auth.currentUser.uid)
    );

    const [snapshot1, snapshot2] = await Promise.all([getDocs(q1), getDocs(q2)]);

    const deletePromises: Promise<void>[] = [];

    snapshot1.forEach((doc) => {
      deletePromises.push(deleteDoc(doc.ref));
    });

    snapshot2.forEach((doc) => {
      deletePromises.push(deleteDoc(doc.ref));
    });

    await Promise.all(deletePromises);
  }
}

export default SocialService.getInstance(); 