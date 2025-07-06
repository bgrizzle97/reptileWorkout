import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../constants/theme';
import { getSupplements, Supplement } from '../services/firebase';

const { width, height } = Dimensions.get('window');

const SupplementsScreen = ({ navigation }: any) => {
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSupplement, setSelectedSupplement] = useState<Supplement | null>(null);

  useEffect(() => {
    loadSupplements();
  }, []);

  const loadSupplements = async () => {
    try {
      setLoading(true);
      const supplementsData = await getSupplements();
      setSupplements(supplementsData);
    } catch (error) {
      console.error('Error loading supplements:', error);
      // If no supplements in database, create default ones
      const defaultSupplements: Supplement[] = [
        {
          id: '1',
          name: 'Lizaroids',
          category: 'Pre-Workout',
          description: 'The ultimate lizard-powered pre-workout that will make you feel like a prehistoric beast!',
          benefits: [
            'Increases lizard-like focus and determination',
            'Boosts prehistoric strength levels',
            'Enhances scaly endurance',
            'Activates ancient reptilian instincts'
          ],
          dosage: '1 scoop 30 minutes before workout',
          timing: 'Pre-workout only',
          broScience: 'Brah, this stuff is so powerful it makes regular pre-workouts look like water. The ancient lizards knew what they were doing when they created this formula. It\'s like drinking liquid determination mixed with pure gainz!',
          price: 49.99,
          rating: 5.0,
        },
        {
          id: '2',
          name: 'Protein Powder - Lizard Edition',
          category: 'Post-Workout',
          description: 'Premium protein powder designed for maximum muscle growth and recovery.',
          benefits: [
            '25g of high-quality protein per serving',
            'Fast absorption for quick recovery',
            'Builds lean muscle mass',
            'Supports muscle repair'
          ],
          dosage: '1 scoop after workout',
          timing: 'Post-workout or as needed',
          broScience: 'You can\'t build a temple without bricks, and you can\'t build muscle without protein. This stuff is the foundation of your gains, brah!',
          price: 29.99,
          rating: 4.8,
        },
        {
          id: '3',
          name: 'Creatine Monohydrate',
          category: 'Other',
          description: 'The most researched supplement for strength and power.',
          benefits: [
            'Increases strength and power',
            'Improves high-intensity performance',
            'Supports muscle growth',
            'Enhances recovery'
          ],
          dosage: '5g daily',
          timing: 'Any time of day',
          broScience: 'Creatine is like putting premium fuel in your muscle engine. It\'s the most researched supplement for a reason - it just works!',
          price: 19.99,
          rating: 4.9,
        }
      ];
      setSupplements(defaultSupplements);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Pre-Workout': return '#FF6B6B';
      case 'Post-Workout': return '#4ECDC4';
      case 'Protein': return '#45B7D1';
      case 'Amino Acids': return '#96CEB4';
      case 'Vitamins': return '#FFEAA7';
      default: return '#DDA0DD';
    }
  };

  const renderSupplementCard = (supplement: Supplement) => {
    const categoryColor = getCategoryColor(supplement.category);
    
    return (
      <TouchableOpacity
        key={supplement.id}
        onPress={() => setSelectedSupplement(supplement)}
      >
        <LinearGradient
          colors={theme.gradients.card}
          style={styles.supplementCard}
        >
          <View style={styles.supplementHeader}>
            <Text style={styles.supplementName}>{supplement.name}</Text>
            <View style={[styles.categoryBadge, { backgroundColor: categoryColor }]}>
              <Text style={styles.categoryText}>{supplement.category}</Text>
            </View>
          </View>

          <Text style={styles.supplementDescription}>{supplement.description}</Text>

          <View style={styles.supplementStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>${supplement.price}</Text>
              <Text style={styles.statLabel}>Price</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{supplement.rating}⭐</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{supplement.benefits.length}</Text>
              <Text style={styles.statLabel}>Benefits</Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const renderSupplementDetail = () => {
    if (!selectedSupplement) return null;

    const categoryColor = getCategoryColor(selectedSupplement.category);

    return (
      <View style={styles.detailOverlay}>
        <LinearGradient
          colors={theme.gradients.card}
          style={styles.detailCard}
        >
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setSelectedSupplement(null)}
          >
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
          
          <Text style={styles.detailTitle}>{selectedSupplement.name}</Text>
          <View style={[styles.categoryBadge, { backgroundColor: categoryColor }]}>
            <Text style={styles.categoryText}>{selectedSupplement.category}</Text>
          </View>
          
          <Text style={styles.detailDescription}>{selectedSupplement.description}</Text>
          
          <View style={styles.detailStats}>
            <View style={styles.detailStat}>
              <Text style={styles.detailStatNumber}>${selectedSupplement.price}</Text>
              <Text style={styles.detailStatLabel}>Price</Text>
            </View>
            <View style={styles.detailStat}>
              <Text style={styles.detailStatNumber}>{selectedSupplement.rating}⭐</Text>
              <Text style={styles.detailStatLabel}>Rating</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Benefits:</Text>
          {selectedSupplement.benefits.map((benefit, index) => (
            <Text key={index} style={styles.benefitItem}>• {benefit}</Text>
          ))}

          <Text style={styles.sectionTitle}>Dosage:</Text>
          <Text style={styles.detailText}>{selectedSupplement.dosage}</Text>

          <Text style={styles.sectionTitle}>Timing:</Text>
          <Text style={styles.detailText}>{selectedSupplement.timing}</Text>

          <Text style={styles.sectionTitle}>BroScience:</Text>
          <Text style={styles.broScienceText}>{selectedSupplement.broScience}</Text>
          
          {selectedSupplement.name === 'Lizaroids' && (
            <TouchableOpacity
              style={styles.videoButton}
              onPress={() => {
                setSelectedSupplement(null);
                navigation.navigate('Video', { videoType: 'gainz' });
              }}
            >
              <LinearGradient
                colors={theme.gradients.cyanGlow}
                style={styles.videoButtonGradient}
              >
                <Text style={styles.videoButtonText}>Watch Lizard Jesus Gainz Video</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </LinearGradient>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={theme.gradients.background}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Supplement Store</Text>
          <Text style={styles.subtitle}>Fuel your gains with the finest supplements, brah!</Text>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={styles.loadingText}>Loading the gainz fuel...</Text>
          </View>
        ) : (
          <View style={styles.supplementsContainer}>
            <Text style={styles.sectionTitle}>Available Supplements ({supplements.length})</Text>
            {supplements.map((supplement) => renderSupplementCard(supplement))}
          </View>
        )}
      </ScrollView>

      {renderSupplementDetail()}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
  },
  title: {
    fontSize: theme.fontSizes.heading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
    ...theme.effects.textGlow,
  },
  subtitle: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.secondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.primary,
    marginTop: theme.spacing.md,
  },
  supplementsContainer: {
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.lg,
    ...theme.effects.textGlow,
  },
  supplementCard: {
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.glow,
  },
  supplementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  supplementName: {
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    color: theme.colors.text,
    flex: 1,
  },
  categoryBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  categoryText: {
    fontSize: theme.fontSizes.small,
    fontWeight: 'bold',
    color: theme.colors.background,
  },
  supplementDescription: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  supplementStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    color: theme.colors.primary,
    ...theme.effects.textGlow,
  },
  statLabel: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  detailOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  detailCard: {
    width: '100%',
    maxHeight: '80%',
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.glow,
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.md,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: theme.colors.error,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    color: theme.colors.background,
    fontWeight: 'bold',
  },
  detailTitle: {
    fontSize: theme.fontSizes.heading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
    ...theme.effects.textGlow,
  },
  detailDescription: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  detailStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: theme.spacing.lg,
  },
  detailStat: {
    alignItems: 'center',
  },
  detailStatNumber: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    ...theme.effects.textGlow,
  },
  detailStatLabel: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  detailText: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  benefitItem: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  broScienceText: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.primary,
    fontStyle: 'italic',
    marginTop: theme.spacing.sm,
  },
  videoButton: {
    marginTop: theme.spacing.lg,
  },
  videoButtonGradient: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.neon,
  },
  videoButtonText: {
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    color: theme.colors.background,
    textAlign: 'center',
  },
});

export default SupplementsScreen; 