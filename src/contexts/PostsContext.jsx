import { createContext, useContext, useState, useEffect } from 'react';

const PostsContext = createContext();

export function usePosts() {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
}

function PostsProvider({ children }) {
  // Default posts data
  const defaultPosts = [
    {
      id: 1,
      title: "My First Commander Deck Build - Atraxa Guide",
      author: "PlayerOne",
      format: "Commander",
      preview: "Just finished building my first Commander deck around Atraxa, Praetors' Voice. Complete guide with budget alternatives...",
      content: `Just finished building my first Commander deck around Atraxa, Praetors' Voice!

I've been playing Standard for a while but decided to try Commander after watching some games at my LGS. The politics and multiplayer aspect really appealed to me.

**Commander:** Atraxa, Praetors' Voice

**Theme:** +1/+1 Counters and Proliferate

**Key Cards:**
- Doubling Season
- Hardened Scales  
- Kalonian Hydra
- Corpsejack Menace

The deck focuses on putting +1/+1 counters on creatures and then proliferating them for massive value. Atraxa's built-in proliferate on end step is incredible value.

**Budget Alternatives:**
If you can't afford Doubling Season (~\$40), try:
- Hardened Scales (\$2)
- Branching Evolution (\$8)
- Pir, Imaginative Rascal (\$3)

Has anyone else built around Atraxa? What strategies have worked for you? I'm thinking about adding some planeswalkers next!`,
      likes: 12,
      comments: [
        { id: 1, author: "CommanderFan", text: "Great choice! Atraxa is so versatile. I run a superfriends version with planeswalkers.", date: "2025-01-18" },
        { id: 2, author: "BudgetPlayer", text: "Thanks for the budget alternatives! Definitely trying Hardened Scales.", date: "2025-01-18" }
      ],
      date: "2025-01-18",
      tags: ["atraxa", "commander", "budget", "guide"]
    },
    {
      id: 2,
      title: "Best Budget Cards for Standard 2025",
      author: "BudgetMage",
      format: "Standard",
      preview: "Top 15 budget cards under \$5 that are dominating the current Standard meta. Updated for latest set release...",
      content: `Here are my top 15 budget cards that are dominating Standard right now:

**Creatures:**
1. Monastery Swiftspear - \$2.50
2. Slickshot Show-Off - \$1.75
3. Heartfire Hero - \$3.00
4. Phoenix Chick - \$1.25

**Spells:**
5. Lightning Bolt - \$1.50
6. Counterspell - \$0.75
7. Shock - \$0.50
8. Consider - \$1.00

**Artifacts/Enchantments:**
9. Rabbit Battery - \$0.75
10. Kumano Faces Kakkazan - \$2.00

These cards provide incredible value for their cost and can compete with expensive alternatives. Lightning Bolt especially is seeing tons of play in multiple archetypes.

The key is finding cards that are reprinted frequently or from recent sets. Avoid Reserved List cards obviously for budget builds!`,
      likes: 24,
      comments: [
        { id: 1, author: "FNMPlayer", text: "Slickshot Show-Off is amazing! Just built a prowess deck around it.", date: "2025-01-17" }
      ],
      date: "2025-01-17",
      tags: ["budget", "standard", "meta", "2025"]
    },
    {
      id: 3,
      title: "Tournament Report: Modern Burn Guide",
      author: "SpikesPlayer", 
      format: "Modern",
      preview: "Went 4-1 at my LGS championship with Burn. Complete sideboard guide and matchup analysis included...",
      content: `Just got back from my LGS championship where I piloted Burn to a 4-1 record!

**Decklist:**
- 4 Lightning Bolt
- 4 Lava Spike  
- 4 Rift Bolt
- 4 Monastery Swiftspear
- 4 Goblin Guide
- 3 Eidolon of the Great Revel
- 4 Boros Charm
- 4 Lightning Helix

**Match Results:**
Round 1: 2-0 vs Hammer Time - Eidolon shut down their artifact spells
Round 2: 2-1 vs Amulet Titan - Game 1 was too slow, but sideboard hate won it
Round 3: 2-0 vs Death's Shadow - They helped us with their life loss!
Round 4: 2-1 vs Tron - Barely squeaked by before they could stabilize  
Round 5: 1-2 vs Living End (only loss) - Couldn't deal with the cascade value

**Key Takeaways:**
- Eidolon of the Great Revel is amazing right now
- Don't be afraid to go face, even when they have creatures
- Sideboard hate wins games

The meta is really diverse right now which makes Burn well-positioned. Linear strategy that can steal games!`,
      likes: 18,
      comments: [
        { id: 1, author: "ModernPlayer", text: "Great report! How do you sideboard against Tron?", date: "2025-01-16" },
        { id: 2, author: "BurnPlayer", text: "Congrats on the finish! What's your sideboard look like?", date: "2025-01-16" }
      ],
      date: "2025-01-16",
      tags: ["tournament", "burn", "modern", "competitive"]
    }
  ];

  // Load posts from localStorage or use default posts
  const loadPostsFromStorage = () => {
    try {
      const savedPosts = localStorage.getItem('mtg-community-posts');
      if (savedPosts) {
        return JSON.parse(savedPosts);
      }
    } catch (error) {
      console.error('Error loading posts from localStorage:', error);
    }
    return defaultPosts;
  };

  // Load nextId from localStorage or calculate from existing posts
  const loadNextIdFromStorage = (posts) => {
    try {
      const savedNextId = localStorage.getItem('mtg-community-nextId');
      if (savedNextId) {
        return parseInt(savedNextId);
      }
    } catch (error) {
      console.error('Error loading nextId from localStorage:', error);
    }
    // If no saved nextId, calculate from existing posts
    return Math.max(...posts.map(post => post.id), 0) + 1;
  };

  const initialPosts = loadPostsFromStorage();
  const [posts, setPosts] = useState(initialPosts);
  const [nextId, setNextId] = useState(loadNextIdFromStorage(initialPosts));

  // Save to localStorage whenever posts change
  useEffect(() => {
    try {
      localStorage.setItem('mtg-community-posts', JSON.stringify(posts));
    } catch (error) {
      console.error('Error saving posts to localStorage:', error);
    }
  }, [posts]);

  // Save nextId whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('mtg-community-nextId', nextId.toString());
    } catch (error) {
      console.error('Error saving nextId to localStorage:', error);
    }
  }, [nextId]);

  const addPost = (postData) => {
    const newPost = {
      id: nextId,
      ...postData,
      author: "You",
      likes: 0,
      comments: [],
      date: new Date().toISOString().split('T')[0],
      tags: postData.content.toLowerCase().match(/#\w+/g) || []
    };
    
    setPosts(prevPosts => [newPost, ...prevPosts]);
    setNextId(prevId => prevId + 1);
    return newPost.id;
  };

  const getPostById = (id) => {
    return posts.find(post => post.id === parseInt(id));
  };

  const updatePost = (id, updates) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === parseInt(id) ? { ...post, ...updates } : post
      )
    );
  };

  const deletePost = (id) => {
    setPosts(prevPosts => 
      prevPosts.filter(post => post.id !== parseInt(id))
    );
  };

  const addComment = (postId, commentText) => {
    const newComment = {
      id: Date.now(),
      author: "You",
      text: commentText,
      date: new Date().toISOString().split('T')[0]
    };

    const post = getPostById(postId);
    if (post) {
      updatePost(postId, {
        comments: [...(post.comments || []), newComment]
      });
    }
  };

  const likePost = (postId) => {
    const post = getPostById(postId);
    if (post) {
      updatePost(postId, { likes: post.likes + 1 });
    }
  };

  // Reset data function (useful for testing)
  const resetData = () => {
    setPosts(defaultPosts);
    setNextId(4);
    localStorage.removeItem('mtg-community-posts');
    localStorage.removeItem('mtg-community-nextId');
  };

  const contextValue = {
    posts,
    addPost,
    getPostById,
    updatePost,
    deletePost,
    addComment,
    likePost,
    resetData
  };

  return (
    <PostsContext.Provider value={contextValue}>
      {children}
    </PostsContext.Provider>
  );
}

// Export PostsProvider as default
export default PostsProvider;