import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Alert, 
  RefreshControl,
  Image 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../constants/theme';
import { useAppSelector } from '../store';
import { themeOptionsMap } from '../store/slices/themeSlice';
import SocialService, { SocialPost, SocialComment } from '../services/social';
import { auth } from '../services/firebase';

interface SocialScreenProps {
  navigation: any;
}

const SocialScreen = ({ navigation }: SocialScreenProps) => {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [activePostId, setActivePostId] = useState<string | null>(null);
  
  const currentThemeId = useAppSelector((state) => state.theme.current);
  const theme = themeOptionsMap[currentThemeId];
  const styles = getStyles(theme);

  useEffect(() => {
    loadSocialFeed();
  }, []);

  const loadSocialFeed = async () => {
    try {
      setLoading(true);
      const feedPosts = await SocialService.getSocialFeed();
      setPosts(feedPosts);
    } catch (error) {
      console.error('Error loading social feed:', error);
      Alert.alert('Error', 'Failed to load social feed');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadSocialFeed();
    setRefreshing(false);
  };

  const handleLike = async (postId: string) => {
    try {
      await SocialService.toggleLike(postId);
      // Refresh the post to get updated likes
      const updatedPosts = posts.map(post => {
        if (post.id === postId) {
          const userId = auth.currentUser?.uid;
          const likes = post.likes || [];
          const isLiked = likes.includes(userId || '');
          
          return {
            ...post,
            likes: isLiked 
              ? likes.filter(id => id !== userId)
              : [...likes, userId || '']
          };
        }
        return post;
      });
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error toggling like:', error);
      Alert.alert('Error', 'Failed to update like');
    }
  };

  const handleComment = async (postId: string) => {
    if (!commentText.trim()) return;

    try {
      await SocialService.addComment(postId, commentText.trim());
      setCommentText('');
      setActivePostId(null);
      // Refresh the post to get updated comments
      const updatedPosts = posts.map(post => {
        if (post.id === postId) {
          const newComment: SocialComment = {
            id: Date.now().toString(),
            userId: auth.currentUser?.uid || '',
            userDisplayName: auth.currentUser?.displayName || 'Anonymous',
            userProfilePicture: auth.currentUser?.photoURL || undefined,
            text: commentText.trim(),
            likes: [],
            createdAt: new Date(),
          };
          return {
            ...post,
            comments: [...post.comments, newComment]
          };
        }
        return post;
      });
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error adding comment:', error);
      Alert.alert('Error', 'Failed to add comment');
    }
  };

  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  const renderPost = (post: SocialPost) => {
    const isLiked = post.likes?.includes(auth.currentUser?.uid || '') || false;
    const isOwnPost = post.userId === auth.currentUser?.uid;

    return (
      <LinearGradient
        key={post.id}
        colors={theme.gradients.card}
        style={styles.postCard}
      >
        {/* Post Header */}
        <View style={styles.postHeader}>
          <View style={styles.userInfo}>
            {post.userProfilePicture ? (
              <Image 
                source={{ uri: post.userProfilePicture }} 
                style={styles.userAvatar}
              />
            ) : (
              <View style={styles.userAvatarPlaceholder}>
                <Text style={styles.userAvatarText}>
                  {post.userDisplayName.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{post.userDisplayName}</Text>
              <Text style={styles.postTime}>{formatTimeAgo(post.createdAt)}</Text>
            </View>
          </View>
          {isOwnPost && (
            <Text style={styles.ownPostBadge}>You</Text>
          )}
        </View>

        {/* Post Content */}
        <View style={styles.postContent}>
          <Text style={styles.postTitle}>{post.title}</Text>
          <Text style={styles.postDescription}>{post.description}</Text>
          
          {/* Post Data Display */}
          {post.type === 'workout_completed' && (
            <View style={styles.workoutData}>
              <Text style={styles.dataLabel}>Workout Stats:</Text>
              <Text style={styles.dataText}>Duration: {post.data.duration || 0} min</Text>
              <Text style={styles.dataText}>Total Weight: {post.data.totalWeight || 0} lbs</Text>
              <Text style={styles.dataText}>Exercises: {post.data.exerciseCount || 0}</Text>
            </View>
          )}
          
          {post.type === 'personal_record' && (
            <View style={styles.prData}>
              <Text style={styles.dataLabel}>New PR:</Text>
              <Text style={styles.dataText}>{post.data.exercise}: {post.data.weight} lbs × {post.data.reps} reps</Text>
            </View>
          )}
        </View>

        {/* Post Actions */}
        <View style={styles.postActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleLike(post.id)}
          >
            <Text style={[styles.actionIcon, isLiked && styles.likedIcon]}>
              {isLiked ? '❤️' : '🤍'}
            </Text>
            <Text style={styles.actionText}>{post.likes?.length || 0}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => setActivePostId(activePostId === post.id ? null : post.id)}
          >
            <Text style={styles.actionIcon}>💬</Text>
            <Text style={styles.actionText}>{post.comments?.length || 0}</Text>
          </TouchableOpacity>
        </View>

        {/* Comments Section */}
        {activePostId === post.id && (
          <View style={styles.commentsSection}>
            {/* Add Comment */}
            <View style={styles.addCommentContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Add a comment..."
                placeholderTextColor={theme.colors.textMuted}
                value={commentText}
                onChangeText={setCommentText}
                multiline
              />
              <TouchableOpacity 
                style={styles.commentButton}
                onPress={() => handleComment(post.id)}
              >
                <Text style={styles.commentButtonText}>Post</Text>
              </TouchableOpacity>
            </View>

            {/* Comments List */}
            {post.comments?.map((comment) => (
              <View key={comment.id} style={styles.commentItem}>
                <View style={styles.commentHeader}>
                  <Text style={styles.commentAuthor}>{comment.userDisplayName}</Text>
                  <Text style={styles.commentTime}>{formatTimeAgo(comment.createdAt)}</Text>
                </View>
                <Text style={styles.commentText}>{comment.text}</Text>
              </View>
            ))}
          </View>
        )}
      </LinearGradient>
    );
  };

  if (loading) {
    return (
      <LinearGradient colors={theme.gradients.background} style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading social feed...</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={theme.gradients.background}
      style={styles.container}
    >
      <ScrollView 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Social Feed</Text>
          <Text style={styles.subtitle}>Share your gains with the community!</Text>
        </View>

        {/* Share Options */}
        <LinearGradient
          colors={theme.gradients.cyanGlow}
          style={styles.shareOptionsCard}
        >
          <Text style={styles.shareOptionsTitle}>Share Your Progress</Text>
          <View style={styles.shareButtons}>
            <TouchableOpacity 
              style={styles.shareButton}
              onPress={() => navigation.navigate('WorkoutTracker')}
            >
              <Text style={styles.shareButtonIcon}>💪</Text>
              <Text style={styles.shareButtonText}>Share Workout</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.shareButton}
              onPress={() => navigation.navigate('Achievements')}
            >
              <Text style={styles.shareButtonIcon}>🏆</Text>
              <Text style={styles.shareButtonText}>Share Achievement</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Posts */}
        {posts.length === 0 ? (
          <LinearGradient
            colors={theme.gradients.card}
            style={styles.emptyStateCard}
          >
            <Text style={styles.emptyStateIcon}>📱</Text>
            <Text style={styles.emptyStateTitle}>No Posts Yet</Text>
            <Text style={styles.emptyStateText}>
              Be the first to share your workout progress and inspire others!
            </Text>
          </LinearGradient>
        ) : (
          posts.map(renderPost)
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const getStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.body,
  },
  header: {
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: theme.spacing.lg,
    top: theme.spacing.lg,
    zIndex: 1,
  },
  backButtonText: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.body,
    fontWeight: '600',
  },
  title: {
    fontSize: theme.fontSizes.heading,
    color: theme.colors.text,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  shareOptionsCard: {
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
  },
  shareOptionsTitle: {
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.text,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  shareButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  shareButton: {
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  shareButtonIcon: {
    fontSize: 32,
    marginBottom: theme.spacing.xs,
  },
  shareButtonText: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.caption,
    fontWeight: '600',
  },
  postCard: {
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: theme.spacing.sm,
  },
  userAvatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
  },
  userAvatarText: {
    color: theme.colors.background,
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.body,
    fontWeight: '600',
  },
  postTime: {
    color: theme.colors.textMuted,
    fontSize: theme.fontSizes.small,
  },
  ownPostBadge: {
    color: theme.colors.primary,
    fontSize: theme.fontSizes.small,
    fontWeight: '600',
  },
  postContent: {
    marginBottom: theme.spacing.md,
  },
  postTitle: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.subheading,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  postDescription: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.body,
    marginBottom: theme.spacing.sm,
  },
  workoutData: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  prData: {
    backgroundColor: 'rgba(255,215,0,0.2)',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  dataLabel: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.caption,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  dataText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.small,
  },
  postActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: theme.spacing.sm,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.lg,
  },
  actionIcon: {
    fontSize: 20,
    marginRight: theme.spacing.xs,
  },
  likedIcon: {
    color: '#FF6B6B',
  },
  actionText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.small,
  },
  commentsSection: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  addCommentContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.sm,
  },
  commentInput: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
    color: theme.colors.text,
    fontSize: theme.fontSizes.body,
    marginRight: theme.spacing.sm,
  },
  commentButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    justifyContent: 'center',
  },
  commentButtonText: {
    color: theme.colors.background,
    fontSize: theme.fontSizes.caption,
    fontWeight: '600',
  },
  commentItem: {
    marginBottom: theme.spacing.sm,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xs,
  },
  commentAuthor: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.small,
    fontWeight: '600',
  },
  commentTime: {
    color: theme.colors.textMuted,
    fontSize: theme.fontSizes.small,
  },
  commentText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.body,
  },
  emptyStateCard: {
    margin: theme.spacing.lg,
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: theme.spacing.md,
  },
  emptyStateTitle: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.subheading,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
  },
  emptyStateText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.body,
    textAlign: 'center',
  },
});

export default SocialScreen; 