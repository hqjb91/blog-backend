const express = require('express');
const router = express.Router();

module.exports = () => {

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
        const { title, summary, content, date, category, tags, username } = req.body;
        articles.push({
            id: articles[articles.lastIndexOf].id+1,
            title, summary, content, date, category, tags, username 
        });
        res.status(200).json({success: true});
    });

    /**
     * Get list of articles with query params of limit and offset for pagination
     * if query param of id is provided return specific article
     * if query param of tag is not empty string return articles with the tag
     * if query param of category is not empty string return articles with the category
     */
    router.get('', async (req, res) => {
        const { limit, offset, id, tag, category } = req.query;
        const articlesSlice = articles.slice(parseInt(offset), parseInt(offset)+parseInt(limit));

        if (id) {
            const article = articles.find(article => article.id == id);
            return res.status(200).json({success: true, article});
        }

        if ( tag != '' ) {
            const articlesSlice = articles.filter(article => article.tags.includes(tag)).slice(parseInt(offset), parseInt(offset)+parseInt(limit));
            return res.status(200).json({success: true, articlesSlice});
        }

        if ( category != '' ) {
            const articlesSlice = articles.filter(article => article.category == category.toString()).slice(parseInt(offset), parseInt(offset)+parseInt(limit));
            return res.status(200).json({success: true, articlesSlice});
        }

        res.status(200).json({success: true, articlesSlice});
    });

    /**
     * Get total number of articles
     */
    router.get('/length', async (req, res) => {  
        let length = articles.length; 
        const { tag, category } = req.query;

        if ( tag != '') {
            length = articles.filter(article => article.tags.includes(tag)).length;
        }

        if ( category != '') {
            length = articles.filter(article => article.category == category).length;
        }
        
        res.status(200).json({success: true, length});
    });

    /**
     * Get a map of the tags
     */
    router.get('/tags', async (req, res) => {  
        const tags = {};
        articles.map( article => {
            for(let tag of article.tags) {
                if (tags[tag] == null)  tags[tag] = 1
                else tags[tag]++;
            }
        }); 
        res.status(200).json({success: true, tags});
    });

    /**
     * Get a map of the categories
     */
    router.get('/categories', async (req, res) => {  
        const categories = {};
        articles.map( article => {
            if (categories[article.category] == null)  categories[article.category] = 1
            else categories[article.category]++;
        }); 
        res.status(200).json({success: true, categories});
    });

    return router;
}