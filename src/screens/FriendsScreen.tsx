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
  Image,
  FlatList 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../constants/theme';
import { useAppSelector } from '../store';
import { themeOptionsMap } from '../store/slices/themeSlice';
import SocialService, { Friend, FriendRequest } from '../services/social';
import { updateUserProfile } from '../services/users';
import { auth } from '../services/firebase';

interface FriendsScreenProps {
  navigation: any;
}

const funnyLairNames = [
  'Lizard Lair',
  'BroTerrarium',
  'Gains Gang',
  'Swole Circle',
  'Reptile Roster',
  'BroTank',
  'The Herpetarium',
  'BroHabitat',
  'Lizard League',
  'Squad of Scales'
];

const LizardLairScreen = ({ navigation }: FriendsScreenProps) => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'friends' | 'requests'>('friends');
  const [searchQuery, setSearchQuery] = useState('');
  
  const currentThemeId = useAppSelector((state) => state.theme.current);
  const theme = themeOptionsMap[currentThemeId];
  const styles = getStyles(theme);

  const userProfile = useAppSelector((state) => state.user.profile);
  const [lairName, setLairName] = useState(userProfile?.lairName || funnyLairNames[0]);
  const [lairNameLoading, setLairNameLoading] = useState(false);

  useEffect(() => {
    loadData();
    if (userProfile?.lairName) setLairName(userProfile.lairName);
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [friendsData, requestsData] = await Promise.all([
        SocialService.getFriends(),
        SocialService.getFriendRequests()
      ]);
      setFriends(friendsData);
      setFriendRequests(requestsData);
    } catch (error) {
      console.error('Error loading friends data:', error);
      Alert.alert('Error', 'Failed to load friends data');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleFriendRequest = async (requestId: string, accept: boolean) => {
    try {
      await SocialService.respondToFriendRequest(requestId, accept);
      
      // Remove the request from the list
      setFriendRequests(prev => prev.filter(req => req.id !== requestId));
      
      // If accepted, reload friends list
      if (accept) {
        const updatedFriends = await SocialService.getFriends();
        setFriends(updatedFriends);
      }
      
      Alert.alert(
        'Success', 
        accept ? 'Friend request accepted!' : 'Friend request declined.'
      );
    } catch (error) {
      console.error('Error handling friend request:', error);
      Alert.alert('Error', 'Failed to handle friend request');
    }
  };

  const handleRemoveFriend = async (friendId: string) => {
    Alert.alert(
      'Remove Friend',
      'Are you sure you want to remove this friend?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              await SocialService.removeFriend(friendId);
              setFriends(prev => prev.filter(friend => friend.friendId !== friendId));
              Alert.alert('Success', 'Friend removed successfully');
            } catch (error) {
              console.error('Error removing friend:', error);
              Alert.alert('Error', 'Failed to remove friend');
            }
          }
        }
      ]
    );
  };

  const handleRandomizeLairName = () => {
    let newName = lairName;
    while (newName === lairName) {
      newName = funnyLairNames[Math.floor(Math.random() * funnyLairNames.length)];
    }
    setLairName(newName);
  };

  const handleSaveLairName = async () => {
    if (!userProfile) return;
    setLairNameLoading(true);
    try {
      await updateUserProfile(userProfile.id, { lairName });
      // Optionally update Redux state if needed
      // dispatch(updateProfile({ lairName }));
      Alert.alert('Success', 'Lair name updated!');
    } catch (error) {
      Alert.alert('Error', 'Failed to update lair name');
    } finally {
      setLairNameLoading(false);
    }
  };

  const renderFriend = ({ item }: { item: Friend }) => (
    <LinearGradient
      colors={theme.gradients.card}
      style={styles.friendCard}
    >
      <View style={styles.friendInfo}>
        {item.friendProfilePicture ? (
          <Image 
            source={{ uri: item.friendProfilePicture }} 
            style={styles.friendAvatar}
          />
        ) : (
          <View style={styles.friendAvatarPlaceholder}>
            <Text style={styles.friendAvatarText}>
              {item.friendDisplayName.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
        <View style={styles.friendDetails}>
          <Text style={styles.friendName}>{item.friendDisplayName}</Text>
          <Text style={styles.friendStatus}>Friends since {new Date(item.createdAt).toLocaleDateString()}</Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={() => handleRemoveFriend(item.friendId)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </LinearGradient>
  );

  const renderFriendRequest = ({ item }: { item: FriendRequest }) => (
    <LinearGradient
      colors={theme.gradients.card}
      style={styles.requestCard}
    >
      <View style={styles.requestInfo}>
        {item.fromUserProfilePicture ? (
          <Image 
            source={{ uri: item.fromUserProfilePicture }} 
            style={styles.requestAvatar}
          />
        ) : (
          <View style={styles.requestAvatarPlaceholder}>
            <Text style={styles.requestAvatarText}>
              {item.fromUserDisplayName.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
        <View style={styles.requestDetails}>
          <Text style={styles.requestName}>{item.fromUserDisplayName}</Text>
          <Text style={styles.requestTime}>
            Sent {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </View>
      
      <View style={styles.requestActions}>
        <TouchableOpacity 
          style={styles.acceptButton}
          onPress={() => handleFriendRequest(item.id, true)}
        >
          <Text style={styles.acceptButtonText}>Accept</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.declineButton}
          onPress={() => handleFriendRequest(item.id, false)}
        >
          <Text style={styles.declineButtonText}>Decline</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );

  if (loading) {
    return (
      <LinearGradient colors={theme.gradients.background} style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading friends...</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={theme.gradients.background}
      style={styles.container}
    >
      {/* Lair Name Editor */}
      <View style={styles.lairNameContainer}>
        <Text style={styles.lairNameLabel}>Your Lair Name:</Text>
        <View style={styles.lairNameInputRow}>
          <TextInput
            style={styles.lairNameInput}
            value={lairName}
            onChangeText={setLairName}
            editable={!lairNameLoading}
          />
          <TouchableOpacity style={styles.randomizeButton} onPress={handleRandomizeLairName} disabled={lairNameLoading}>
            <Text style={styles.randomizeButtonText}>🎲</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveLairName} disabled={lairNameLoading}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{lairName}</Text>
        <Text style={styles.subtitle}>Connect with your fitness community</Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'friends' && styles.activeTab]}
          onPress={() => setActiveTab('friends')}
        >
          <Text style={[styles.tabText, activeTab === 'friends' && styles.activeTabText]}>
            Friends ({friends.length})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'requests' && styles.activeTab]}
          onPress={() => setActiveTab('requests')}
        >
          <Text style={[styles.tabText, activeTab === 'requests' && styles.activeTabText]}>
            Requests ({friendRequests.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search friends..."
          placeholderTextColor={theme.colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Content */}
      {activeTab === 'friends' ? (
        <FlatList
          data={friends}
          renderItem={renderFriend}
          keyExtractor={(item) => item.id}
          style={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <LinearGradient
              colors={theme.gradients.card}
              style={styles.emptyStateCard}
            >
              <Text style={styles.emptyStateIcon}>👥</Text>
              <Text style={styles.emptyStateTitle}>No Friends Yet</Text>
              <Text style={styles.emptyStateText}>
                Start connecting with other fitness enthusiasts!
              </Text>
            </LinearGradient>
          }
        />
      ) : (
        <FlatList
          data={friendRequests}
          renderItem={renderFriendRequest}
          keyExtractor={(item) => item.id}
          style={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <LinearGradient
              colors={theme.gradients.card}
              style={styles.emptyStateCard}
            >
              <Text style={styles.emptyStateIcon}>📨</Text>
              <Text style={styles.emptyStateTitle}>No Friend Requests</Text>
              <Text style={styles.emptyStateText}>
                You're all caught up with friend requests.
              </Text>
            </LinearGradient>
          }
        />
      )}

      {/* Add Friend Button */}
      <TouchableOpacity
        style={styles.addFriendButton}
        onPress={() => navigation.navigate('UserSearch')}
      >
        <LinearGradient
          colors={theme.gradients.primary}
          style={styles.addFriendGradient}
        >
          <Text style={styles.addFriendIcon}>+</Text>
          <Text style={styles.addFriendText}>Add Friend</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const getStyles = (theme: any) => StyleSheet.create({
  container: {
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
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.xs,
  },
  tab: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
    borderRadius: theme.borderRadius.sm,
  },
  activeTab: {
    backgroundColor: theme.colors.primary,
  },
  tabText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.caption,
    fontWeight: '600',
  },
  activeTabText: {
    color: theme.colors.background,
  },
  searchContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  searchInput: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    color: theme.colors.text,
    fontSize: theme.fontSizes.body,
  },
  list: {
    flex: 1,
  },
  friendCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  friendAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: theme.spacing.md,
  },
  friendAvatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  friendAvatarText: {
    color: theme.colors.background,
    fontSize: theme.fontSizes.subheading,
    fontWeight: 'bold',
  },
  friendDetails: {
    flex: 1,
  },
  friendName: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.body,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  friendStatus: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.small,
  },
  removeButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  removeButtonText: {
    color: theme.colors.background,
    fontSize: theme.fontSizes.caption,
    fontWeight: '600',
  },
  requestCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
  },
  requestInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  requestAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: theme.spacing.md,
  },
  requestAvatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  requestAvatarText: {
    color: theme.colors.background,
    fontSize: theme.fontSizes.subheading,
    fontWeight: 'bold',
  },
  requestDetails: {
    flex: 1,
  },
  requestName: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.body,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  requestTime: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.small,
  },
  requestActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  acceptButton: {
    backgroundColor: theme.colors.primary,
    flex: 1,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    marginRight: theme.spacing.sm,
  },
  acceptButtonText: {
    color: theme.colors.background,
    fontSize: theme.fontSizes.caption,
    fontWeight: '600',
  },
  declineButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    flex: 1,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    marginLeft: theme.spacing.sm,
  },
  declineButtonText: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.caption,
    fontWeight: '600',
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
  addFriendButton: {
    position: 'absolute',
    bottom: theme.spacing.lg,
    right: theme.spacing.lg,
    left: theme.spacing.lg,
  },
  addFriendGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
  },
  addFriendIcon: {
    color: theme.colors.background,
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: theme.spacing.sm,
  },
  addFriendText: {
    color: theme.colors.background,
    fontSize: theme.fontSizes.body,
    fontWeight: '600',
  },
  lairNameContainer: {
    marginTop: 24,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  lairNameLabel: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.body,
    marginBottom: 4,
  },
  lairNameInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lairNameInput: {
    flex: 1,
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    padding: 8,
    marginRight: 8,
  },
  randomizeButton: {
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.sm,
    padding: 8,
    marginRight: 8,
  },
  randomizeButtonText: {
    color: theme.colors.text,
    fontSize: 18,
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.sm,
    padding: 8,
  },
  saveButtonText: {
    color: theme.colors.background,
    fontWeight: 'bold',
  },
});

export default LizardLairScreen; 