import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useAppSelector } from '../store';
import { themeOptionsMap } from '../store/slices/themeSlice';
import { db } from '../services/firebase';
import { collection, query, orderBy, getDocs, updateDoc, doc } from 'firebase/firestore';

interface NotificationItem {
  id: string;
  type: string;
  message: string;
  relatedId?: string;
  read: boolean;
  timestamp: any;
}

const NotificationsScreen = () => {
  const userProfile = useAppSelector((state) => state.user.profile);
  const currentThemeId = useAppSelector((state) => state.theme.current);
  const theme = themeOptionsMap[currentThemeId];
  const styles = getStyles(theme);

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userProfile?.id) {
      fetchNotifications();
    }
  }, [userProfile?.id]);

  const fetchNotifications = async () => {
    if (!userProfile?.id) return;
    setLoading(true);
    try {
      const q = query(
        collection(db, 'notifications', userProfile.id, 'userNotifications'),
        orderBy('timestamp', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const notifs: NotificationItem[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        notifs.push({
          id: docSnap.id,
          type: data.type,
          message: data.message,
          relatedId: data.relatedId,
          read: data.read,
          timestamp: data.timestamp,
        });
      });
      setNotifications(notifs);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notifId: string) => {
    if (!userProfile?.id) return;
    try {
      await updateDoc(doc(db, 'notifications', userProfile.id, 'userNotifications', notifId), { read: true });
      setNotifications((prev) => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
    } catch (error) {
      Alert.alert('Error', 'Failed to mark as read');
    }
  };

  const renderItem = ({ item }: { item: NotificationItem }) => (
    <TouchableOpacity
      style={[styles.notifCard, !item.read && styles.unreadCard]}
      onPress={() => markAsRead(item.id)}
    >
      <Text style={styles.notifType}>{item.type.replace('_', ' ').toUpperCase()}</Text>
      <Text style={styles.notifMessage}>{item.message}</Text>
      <Text style={styles.notifTime}>{item.timestamp?.toDate ? item.timestamp.toDate().toLocaleString() : ''}</Text>
    </TouchableOpacity>
  );

  if (!userProfile?.id) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>You must be logged in to view notifications.</Text>
      </View>
    );
  }
  return (
    <LinearGradient colors={theme.gradients.background} style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshing={loading}
        onRefresh={fetchNotifications}
        ListEmptyComponent={<Text style={styles.emptyText}>No notifications yet!</Text>}
      />
    </LinearGradient>
  );
};

const getStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: theme.fontSizes.heading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 24,
    ...theme.effects.textGlow,
  },
  notifCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: 16,
    marginBottom: 12,
  },
  unreadCard: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  notifType: {
    fontSize: theme.fontSizes.caption,
    color: theme.colors.secondary,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  notifMessage: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.text,
    marginBottom: 4,
  },
  notifTime: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.textMuted,
  },
  emptyText: {
    color: theme.colors.textMuted,
    textAlign: 'center',
    marginTop: 32,
  },
});

export default NotificationsScreen; 