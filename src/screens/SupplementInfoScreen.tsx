import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useAppSelector } from '../store';
import { themeOptionsMap } from '../store/slices/themeSlice';

interface SupplementInfoScreenProps {
  navigation: any;
}

const SupplementInfoScreen = ({ navigation }: SupplementInfoScreenProps) => {
  const currentThemeId = useAppSelector((state) => state.theme.current);
  const theme = themeOptionsMap[currentThemeId];
  const styles = getStyles(theme);

  const supplementCategories = [
    {
      title: 'Pre-Workout Supplements',
      icon: '⚡',
      description: 'Fuel your workouts with energy and focus',
      supplements: [
        {
          name: 'Caffeine',
          description: 'Natural stimulant that increases alertness and energy',
          benefits: ['Improved focus', 'Enhanced performance', 'Reduced fatigue'],
          dosage: '200-400mg 30-60 minutes before workout',
          broScience: 'Brah, caffeine is like the alarm clock for your muscles. It wakes them up and tells them it\'s time to get serious!'
        },
        {
          name: 'Creatine Monohydrate',
          description: 'The most researched supplement for strength and power',
          benefits: ['Increased strength', 'Better power output', 'Faster recovery'],
          dosage: '5g daily (loading phase: 20g for 5-7 days)',
          broScience: 'Creatine is like putting premium fuel in your muscle engine. It\'s the most researched supplement for a reason - it just works!'
        },
        {
          name: 'Beta-Alanine',
          description: 'Amino acid that helps buffer lactic acid',
          benefits: ['Delayed muscle fatigue', 'Improved endurance', 'Better high-intensity performance'],
          dosage: '3-6g daily',
          broScience: 'This stuff makes you feel like you can lift forever. The tingles mean it\'s working, brah!'
        }
      ]
    },
    {
      title: 'Protein Supplements',
      icon: '🥛',
      description: 'Essential for muscle growth and recovery',
      supplements: [
        {
          name: 'Whey Protein',
          description: 'Fast-absorbing protein from milk',
          benefits: ['Quick muscle recovery', 'High in BCAAs', 'Easy to digest'],
          dosage: '20-30g post-workout or as needed',
          broScience: 'Whey is like the express delivery service for your muscles. It gets there fast and gets the job done!'
        },
        {
          name: 'Casein Protein',
          description: 'Slow-absorbing protein for sustained release',
          benefits: ['Long-lasting protein supply', 'Prevents muscle breakdown', 'Great for bedtime'],
          dosage: '20-30g before bed',
          broScience: 'Casein is like the slow cooker of proteins. It keeps feeding your muscles all night long!'
        },
        {
          name: 'Plant-Based Protein',
          description: 'Protein from sources like pea, rice, or hemp',
          benefits: ['Vegan-friendly', 'Easy on digestion', 'Complete amino acid profile'],
          dosage: '20-30g as needed',
          broScience: 'Plants can build muscle too, brah! Don\'t let anyone tell you otherwise!'
        }
      ]
    },
    {
      title: 'Post-Workout Supplements',
      icon: '🔄',
      description: 'Recovery and muscle building support',
      supplements: [
        {
          name: 'BCAAs (Branched Chain Amino Acids)',
          description: 'Essential amino acids for muscle recovery',
          benefits: ['Reduces muscle soreness', 'Speeds up recovery', 'Prevents muscle breakdown'],
          dosage: '5-10g during or post-workout',
          broScience: 'BCAAs are like the repair crew for your muscles. They show up right when you need them!'
        },
        {
          name: 'Glutamine',
          description: 'Amino acid that supports immune function and recovery',
          benefits: ['Faster recovery', 'Better immune function', 'Reduced muscle soreness'],
          dosage: '5-10g daily',
          broScience: 'Glutamine is like the security guard for your immune system. It keeps you healthy so you can keep lifting!'
        },
        {
          name: 'Electrolytes',
          description: 'Minerals lost through sweat during exercise',
          benefits: ['Prevents cramping', 'Maintains hydration', 'Supports nerve function'],
          dosage: 'As needed during/after intense workouts',
          broScience: 'Electrolytes are like the oil in your engine. Without them, everything starts to break down!'
        }
      ]
    },
    {
      title: 'Vitamins & Minerals',
      icon: '💊',
      description: 'Essential nutrients for overall health and performance',
      supplements: [
        {
          name: 'Vitamin D',
          description: 'Essential for bone health and muscle function',
          benefits: ['Stronger bones', 'Better muscle function', 'Improved mood'],
          dosage: '1000-4000 IU daily',
          broScience: 'Vitamin D is like the sunshine vitamin. It makes everything work better, including your gains!'
        },
        {
          name: 'Magnesium',
          description: 'Mineral that supports muscle and nerve function',
          benefits: ['Better sleep', 'Reduced muscle cramps', 'Improved recovery'],
          dosage: '200-400mg daily',
          broScience: 'Magnesium is like the chill pill for your muscles. It helps them relax and recover!'
        },
        {
          name: 'Zinc',
          description: 'Essential for protein synthesis and immune function',
          benefits: ['Better recovery', 'Stronger immune system', 'Improved testosterone levels'],
          dosage: '15-30mg daily',
          broScience: 'Zinc is like the foreman on your muscle construction site. It makes sure everything gets built right!'
        }
      ]
    },
    {
      title: 'Fat Burners & Weight Loss',
      icon: '🔥',
      description: 'Supplements to support fat loss and metabolism',
      supplements: [
        {
          name: 'Green Tea Extract',
          description: 'Natural fat burner with antioxidant properties',
          benefits: ['Increased fat burning', 'Better metabolism', 'Antioxidant protection'],
          dosage: '500-1000mg daily',
          broScience: 'Green tea is like the gentle fire that burns your fat. It\'s natural and it works!'
        },
        {
          name: 'CLA (Conjugated Linoleic Acid)',
          description: 'Fatty acid that helps reduce body fat',
          benefits: ['Reduces body fat', 'Preserves muscle mass', 'Supports weight loss'],
          dosage: '3-6g daily',
          broScience: 'CLA is like the sculptor for your body. It helps you lose fat while keeping your muscle!'
        },
        {
          name: 'L-Carnitine',
          description: 'Amino acid that helps transport fat for energy',
          benefits: ['Better fat utilization', 'Improved endurance', 'Enhanced recovery'],
          dosage: '1-3g daily',
          broScience: 'Carnitine is like the taxi service for your fat. It transports it to where it can be burned!'
        }
      ]
    }
  ];

  const renderSupplementCard = (supplement: any) => (
    <LinearGradient
      key={supplement.name}
      colors={theme.gradients.card}
      style={styles.supplementCard}
    >
      <Text style={styles.supplementName}>{supplement.name}</Text>
      <Text style={styles.supplementDescription}>{supplement.description}</Text>
      
      <Text style={styles.benefitsTitle}>Benefits:</Text>
      {supplement.benefits.map((benefit: string, index: number) => (
        <Text key={index} style={styles.benefitItem}>• {benefit}</Text>
      ))}
      
      <Text style={styles.dosageTitle}>Recommended Dosage:</Text>
      <Text style={styles.dosageText}>{supplement.dosage}</Text>
      
      <Text style={styles.broScienceTitle}>BroScience:</Text>
      <Text style={styles.broScienceText}>{supplement.broScience}</Text>
    </LinearGradient>
  );

  const renderCategory = (category: any) => (
    <View key={category.title} style={styles.categoryContainer}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryIcon}>{category.icon}</Text>
        <View style={styles.categoryText}>
          <Text style={styles.categoryTitle}>{category.title}</Text>
          <Text style={styles.categoryDescription}>{category.description}</Text>
        </View>
      </View>
      
      {category.supplements.map(renderSupplementCard)}
    </View>
  );

  return (
    <LinearGradient
      colors={theme.gradients.background}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Supplement Guide</Text>
          <Text style={styles.subtitle}>Everything you need to know about gym supplements, brah!</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.introText}>
            Welcome to the ultimate supplement guide! Here you'll find everything you need to know about the different types of supplements available at the gym. Remember, supplements are meant to supplement a good diet and training program - they're not magic pills!
          </Text>

          {supplementCategories.map(renderCategory)}
        </View>
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
  header: {
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
  },
  backButton: {
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  backButtonText: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.primary,
    fontWeight: 'bold',
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
  content: {
    padding: theme.spacing.lg,
  },
  introText: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
    lineHeight: 24,
  },
  categoryContainer: {
    marginBottom: theme.spacing.xl,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  categoryIcon: {
    fontSize: 40,
    marginRight: theme.spacing.md,
  },
  categoryText: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
    ...theme.effects.textGlow,
  },
  categoryDescription: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
  },
  supplementCard: {
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.glow,
  },
  supplementName: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
    ...theme.effects.textGlow,
  },
  supplementDescription: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  benefitsTitle: {
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  benefitItem: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  dosageTitle: {
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },
  dosageText: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  broScienceTitle: {
    fontSize: theme.fontSizes.body,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  broScienceText: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.primary,
    fontStyle: 'italic',
  },
});

export default SupplementInfoScreen; 