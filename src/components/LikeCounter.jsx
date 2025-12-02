import React, { useState, useEffect } from 'react';
import { translations } from '../utils/translations';

const NAMESPACE = 'zscore-2maxglad';
const KEY_VIEWS = 'views';
const KEY_LIKES = 'likes';

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
                // Increment views (simple hit counter)
                // We use sessionStorage to prevent counting refresh as new visit in same session
                const sessionVisited = sessionStorage.getItem('zscore_visited');

                let viewsResponse;
                if (!sessionVisited) {
                    viewsResponse = await fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/${KEY_VIEWS}/up`);
                    sessionStorage.setItem('zscore_visited', 'true');
                } else {
                    viewsResponse = await fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/${KEY_VIEWS}/`);
                }

                const viewsData = await viewsResponse.json();
                if (viewsData && viewsData.count !== undefined) {
                    setViews(viewsData.count);
                }

                // Get likes count (without incrementing)
                const likesResponse = await fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/${KEY_LIKES}/`);
                const likesData = await likesResponse.json();
                if (likesData && likesData.count !== undefined) {
                    setLikes(likesData.count);
                }
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
            setLikes(prev => (prev || 0) + 1);
            localStorage.setItem('zscore_liked', 'true');

            await fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/${KEY_LIKES}/up`);
        } catch (error) {
            console.error('Error liking:', error);
            // Revert on error if needed, but for a like button it's usually fine to just ignore
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
