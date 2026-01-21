import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dropIndex = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        const collection = mongoose.connection.collection('users');

        // List indexes before dropping
        const indexes = await collection.indexes();
        console.log('Current Indexes:', indexes);

        const indexName = 'id_1';
        const indexExists = indexes.some(idx => idx.name === indexName);

        if (indexExists) {
            await collection.dropIndex(indexName);
            console.log(`✅ Successfully dropped index: ${indexName}`);
        } else {
            console.log(`⚠️ Index ${indexName} not found. It might have already been dropped.`);
        }

        // List indexes after dropping
        const updatedIndexes = await collection.indexes();
        console.log('Updated Indexes:', updatedIndexes);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error dropping index:', error);
        process.exit(1);
    }
};

dropIndex();
