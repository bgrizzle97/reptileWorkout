const { execSync } = require('child_process');

console.log('Deploying Firebase indexes...');

try {
  // Deploy the indexes
  execSync('firebase deploy --only firestore:indexes', { 
    stdio: 'inherit',
    cwd: process.cwd()
  });
  
  console.log('✅ Firebase indexes deployed successfully!');
} catch (error) {
  console.error('❌ Error deploying Firebase indexes:', error.message);
  console.log('\nTo deploy indexes manually, run:');
  console.log('firebase deploy --only firestore:indexes');
} 