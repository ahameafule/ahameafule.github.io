const apiKey = 'KEY'; // Ersetze mit deinem YouTube API-Schlüssel
const placeholderThumbnail = 'assets/placeholder.png';

const leagues = {
    'superleague': ['UC5vaBYHzkZvJkjGSNrz5tWQ'], // Beispiel-Channel-ID für Super League
};

function fetchVideos(league, containerId) {
    const container = document.getElementById(containerId);
    leagues[league].forEach(channelId => {
        fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&type=video&order=date&maxResults=5`)
            .then(response => {
                console.log(response); // Ausgabe der Antwort in der Konsole
                return response.json();
            })
            .then(data => {
                console.log(data); // Ausgabe der Daten in der Konsole
                data.items.forEach(item => {
                    const videoElement = createVideoElement(item.snippet);
                    container.appendChild(videoElement);
                });
            })
            .catch(error => console.error('Error fetching data:', error)); // Fehlerbehandlung
    });
}

function createVideoElement(snippet) {
    const videoDiv = document.createElement('div');
    const title = snippet.title.replace(/(.*?\s-\s)(.*?)/, '$2'); // Nur Mannschaften und Wettbewerb im Titel
    const videoId = snippet.id.videoId;

    videoDiv.innerHTML = `
        <img src="${placeholderThumbnail}" alt="No Spoiler Thumbnail">
        <h3>${title}</h3>
        <iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen></iframe>
    `;
    return videoDiv;
}

document.addEventListener('DOMContentLoaded', () => {
    fetchVideos('superleague', 'superleague-videos');
    fetchVideos('europe', 'europe-videos');
    fetchVideos('international', 'international-videos');
});
