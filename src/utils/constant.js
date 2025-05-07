// YouTube API Constants
export const API_Key = process.env.VITE_YOUTUBE_API_KEY || "AIzaSyABMtW3yk54BhD45FTRrB0rIWky5O2RUow";

export const URL='https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&';

export const Suggestion_URL='https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&q=';

export const channel_URL="https://www.googleapis.com/youtube/v3/channels?part=snippet&";