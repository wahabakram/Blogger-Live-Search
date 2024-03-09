const search = document.getElementById('search');
const matchList = document.getElementById('match-list');
const sercretKey = "AIzaSyC4TCttieyjBJMOX6dY3XKttgGCeNpVKXY";
const bloggerId = "2159530372678106659";

//Search books and filter it
const searchBooks = async searchText => {
const res = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${bloggerId}/posts?maxResults=500&key=${sercretKey}`);
const books = await res.json();

//Get matches to current text input
let matches = books.items.filter(book =>{
    const regex = new RegExp(`^${searchText}`, 'gi');
    return book.title.match(regex) || book.content.match(regex);
});
if(searchText.length === 0){
    matches = [];
    matchList.innerHTML = '';
}
outputHtml(matches);
};

//Show results in HTML
const outputHtml = matches => {
    if(matches.length > 0){
        const html = matches.map(match => `
        <div class="card card-body mb-1">
        <h4><a href="${match.url}">${match.title}</a><small class="text-primary"> ${match.published}</small></h4>
        <small>Author: ${match.author.displayName}</small>
        </div>
        `).join('');
        matchList.innerHTML = html;
    }
};

search.addEventListener('input', () => searchBooks(search.value));