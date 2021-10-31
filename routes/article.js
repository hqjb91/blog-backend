const express = require('express');
const { DB_NAME, ARTICLE_COLLECTION } = require('../utils/constants');
const router = express.Router();
const ObjectId = require('mongodb').ObjectID;

module.exports = (mongoClient) => {

    /**
     * interface Article {
	 * id: number;
	 * title: string;
	 * summary: string;
	 * content: string;
     * image: string;
	 * date: Date;
	 * category: string;
	 * tags: Array<string>;
	 * username: string;
     * }
     */

    // Hardcoded article for testing html and javascript content
    const articles = [
        {id: 1, title: "Mechanical Engineering - Pump Sizing", summary: "When selecting a pump either for Air-Conditioning and Mechanical Ventilation services (such as chilled water pumps) or Plumbing and Sanitary services (such as domestic water pumps), the steps are similar and relatively straightforward.", 
        content: `<div><p>When selecting a pump either for Air-Conditioning and Mechanical Ventilation services (such as chilled water pumps) or Plumbing and Sanitary services (such as domestic water pumps), the steps are similar and relatively straightforward :</p><ol><li>Determine the flow rate required</li><li>Utilize the Steady Flow Energy Equation to derive the necessary pump head</li><li>Determine the power required</li></ol><hr>`, image: "", date: new Date(2021, 10, 31), category: "Mechanical Engineering", tags: ["Mechanical Engineering", "Fluid Dynamics", "Pump sizing"], username: "He Quanjie" },
    ];

    /**
     * Create article
     */
    router.post('', async (req, res) => {
        const { title, summary, content, date, category, tags, username, image } = req.body;

        try {
            const result = await mongoClient.db(DB_NAME).collection(ARTICLE_COLLECTION)
                                .insertOne({
                                    title, summary, content, image, date, category, tags, username 
                                });
            res.status(200).json({success: true, result});
        } catch (e) {
            res.status(500).json({success: false, error: e.message});
        }
    });

    /**
     * Get list of articles with query params of limit and offset for pagination
     * if query param of id is provided return specific article
     * if query param of tag is not empty string return articles with the tag
     * if query param of category is not empty string return articles with the category
     */
    router.get('', async (req, res) => {
        const { limit, offset, id, tag, category } = req.query;

        try {
            if (id) {
                console.log(id);
                const article = await mongoClient.db(DB_NAME).collection(ARTICLE_COLLECTION)
                                        .findOne({_id: ObjectId(id)});
                if(article)
                    return res.status(200).json({success: true, article});
            }

            const articlesSlice = await mongoClient.db(DB_NAME).collection(ARTICLE_COLLECTION).find()
                                        .limit(parseInt(limit)).skip(parseInt(offset))
                                        .sort({date: -1})
                                        .toArray();

            if ( tag != '' ) {
               const articlesSlice = await mongoClient.db(DB_NAME).collection(ARTICLE_COLLECTION)
                .find({
                    tags: { $elemMatch: { $eq: tag } }
                })
                .limit(parseInt(limit)).skip(parseInt(offset))
                .sort({date: -1})
                .toArray();
                
                return res.status(200).json({success: true, articlesSlice});
            }

            if ( category != '' ) {
               const articlesSlice = await mongoClient.db(DB_NAME).collection(ARTICLE_COLLECTION)
                .find({
                    category: { $eq: category }
                })
                .limit(parseInt(limit)).skip(parseInt(offset))
                .sort({date: -1})
                .toArray();
                
                return res.status(200).json({success: true, articlesSlice});
            }

            res.status(200).json({success: true, articlesSlice});
        } catch(e) {
            res.status(500).json({success: false, error: e.message});
        }
    });

    /**
     * Get total number of articles
     */
    router.get('/length', async (req, res) => {  
        const { tag, category } = req.query;

        try {
            let length = await mongoClient.db(DB_NAME).collection(ARTICLE_COLLECTION).count(); 

            if ( tag != '' ) {
                length = await mongoClient.db(DB_NAME).collection(ARTICLE_COLLECTION)
                .find({
                    tags: { $elemMatch: { $eq: tag } }
                })
                .count();
            }

            if ( category != '' ) {
                length = await mongoClient.db(DB_NAME).collection(ARTICLE_COLLECTION)
                .find({
                    category: { $eq: category }
                })
                .count();
            }
            
            res.status(200).json({success: true, length});
        } catch(e) {
            res.status(500).json({success: false, error: e.message});
        }
    });

    /**
     * Get a map of the tags
     */
    router.get('/tags', async (req, res) => {  
        /**
         * e.g. 
         * tags = {
         *  test1 : 2,
         *  test2 : 3
         * }
         */
        try {
            const tagsResults = await mongoClient.db(DB_NAME).collection(ARTICLE_COLLECTION)
            .aggregate([
                {$unwind:"$tags"}, // Unwind the tags array
                {$group:{"_id":"$tags","count":{$sum:1}}}, // Group by the tags field, get the count using $sum
                {$group:{"_id":null,"tags_details":{$push:{"tag":"$_id", // Group once again to get consolidated array
                                                            "count":"$count"}}}},
                {$project:{"_id":0,"tags_details":1}}
                ]).toArray();

            const tags = {};
            tagsResults[0]['tags_details'].map( tagDetail => tags[tagDetail.tag] = tagDetail.count );

            res.status(200).json({success: true, tags});
        } catch (e) {
            res.status(500).json({success: false, error: e.message});
        }
    });

    /**
     * Get a map of the categories
     */
    router.get('/categories', async (req, res) => {  
        /**
         * e.g. 
         * categories = {
         *  test1 : 2,
         *  test2 : 3
         * }
         */
        try {
            const categoriesResults = await mongoClient.db(DB_NAME).collection(ARTICLE_COLLECTION)
            .aggregate([
                {$group:{"_id":"$category","count":{$sum:1}}}, // Group by the tags field, get the count using $sum
                {$group:{"_id":null,"categories_details":{$push:{"category":"$_id", // Group once again to get consolidated array
                                                            "count":"$count"}}}},
                {$project:{"_id":0,"categories_details":1}}
                ]).toArray();

            const categories = {};
            categoriesResults[0]['categories_details'].map( categoryDetail => categories[categoryDetail.category] = categoryDetail.count );

            res.status(200).json({success: true, categories});
        } catch (e) {
            res.status(500).json({success: false, error: e.message});
        }
    });

    return router;
}