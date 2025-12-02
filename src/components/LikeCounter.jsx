import React, { useState, useEffect } from 'react';
import { translations } from '../utils/translations';
import counterapi from 'counterapi';

const API_KEY = 'ut_NuxkveMLVYURPDvRtB2ROjzSQGlYoNeTGIZ6cubj';

const LikeCounter = ({ language }) => {
    const [likes, setLikes] = useState(null);
    const [views, setViews] = useState(null);
    const [hasLiked, setHasLiked] = useState(false);
    const [loading, setLoading] = useState(true);
    const t = translations[language];

    useEffect(() => {
        // Check local storage for like status
        const liked = localStorage.getItem('zscore_liked') === 'true';
        setHasLiked(liked);

        // Fetch initial data
        const fetchData = async () => {
            try {
                // Initialize counter client
                const counter = counterapi(API_KEY);

                // Increment views (simple hit counter)
                // We use sessionStorage to prevent counting refresh as new visit in same session
                const sessionVisited = sessionStorage.getItem('zscore_visited');

                let viewsCount;
                if (!sessionVisited) {
                    const viewsResult = await counter.up('zscore-views');
                    viewsCount = viewsResult.count;
                    sessionStorage.setItem('zscore_visited', 'true');
                } else {
                    const viewsResult = await counter.get('zscore-views');
                    viewsCount = viewsResult.count;
                }

                console.log('Views count:', viewsCount);
                setViews(viewsCount);

                // Get likes count (without incrementing)
                const likesResult = await counter.get('zscore-likes');
                console.log('Likes count:', likesResult.count);
                setLikes(likesResult.count);
            } catch (error) {
                console.error('Error fetching counters:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleLike = async () => {
        if (hasLiked) return;

        try {
            setHasLiked(true); // Optimistic update
            const newCount = (likes || 0) + 1;
            setLikes(newCount);
            localStorage.setItem('zscore_liked', 'true');

            console.log('Sending like to server...');
            const counter = counterapi(API_KEY);
            const result = await counter.up('zscore-likes');
            console.log('Like response:', result);

            // Update with server value
            if (result && result.count !== undefined) {
                setLikes(result.count);
                console.log('Updated likes to:', result.count);
            }
        } catch (error) {
            console.error('Error liking:', error);
        }
    };

    if (loading && likes === null && views === null) return null;

    return (
        <div className="like-counter-container">
            <div className="like-cta">{t.likeCta}</div>
            <div className="counter-stats">
                <div className="counter-item views-item">
                    <span className="counter-icon">👁️</span>
                    <span className="counter-value">{views !== null ? views : '...'}</span>
                    <span className="counter-label">{t.views}</span>
                </div>

                <div className="counter-divider">|</div>

                <button
                    className={`counter-item like-button ${hasLiked ? 'liked' : ''}`}
                    onClick={handleLike}
                    disabled={hasLiked}
                    title={hasLiked ? t.youLiked : t.likeProject}
                >
                    <span className="counter-icon">{hasLiked ? '❤️' : '🤍'}</span>
                    <span className="counter-value">{likes !== null ? likes : '...'}</span>
                    <span className="counter-label">{t.likes}</span>
                </button>
            </div>
        </div>
    );
};

export default LikeCounter;
