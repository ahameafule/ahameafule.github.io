const apiKey = 'AIzaSyAGUSLiuonS-RPFRudYxvRI-UaolVUANTk'; // Ersetze mit deinem YouTube API-Schlüssel
const placeholderThumbnail = 'assets/placeholder.png';

const leagues = {
    'superleague': 'UC5vaBYHzkZvJkjGSNrz5tWQ', // Beispiel-Channel-ID für Super League
    'sport1': ['@SPORT1'],   // Beispiel-Channel-IDs für europäische Ligen
    'international': ['bluesport'] // Beispiel-Channel-IDs für internationale Turniere
};

function fetchVideos(league, containerId) {
    const container = document.getElementById(containerId);
    leagues[league].forEach(channelId => {
        fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&type=video&order=date&maxResults=5`)
            .then(response => response.json())
            .then(data => {
                data.items.forEach(item => {
                    const videoElement = createVideoElement(item.snippet);
                    container.appendChild(videoElement);
                });
            });
    });
}

function createVideoElement(snippet) {
    const videoDiv = document.createElement('div');
    const title = snippet.title.replace(/(.*?\s-\s)(.*?)/, '$2'); // Nur Mannschaften und Wettbewerb im Titel
    const thumbnail = snippet.thumbnails.medium.url;

    videoDiv.innerHTML = `
        <img src="${placeholderThumbnail}" alt="No Spoiler Thumbnail">
        <h3>${title}</h3>
        <iframe src="https://www.youtube.com/embed/${snippet.resourceId.videoId}" allowfullscreen></iframe>
    `;
    return videoDiv;
}

document.addEventListener('DOMContentLoaded', () => {
    fetchVideos('superleague', 'superleague-videos');
    fetchVideos('europe', 'europe-videos');
    fetchVideos('international', 'international-videos');
});
