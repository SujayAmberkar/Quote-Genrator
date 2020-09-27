const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')

//show loading
function loading() {
    loader.hidden = false
    quoteContainer.hidden = true
}

// hide loading
function complete(){
    if(!loader.hidden){
        quoteContainer.hidden=false;
        loader.hidden=true;
    }
}
//Get Quote from API
async function getQuote() {
    loading();
    const proxyUrl='https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        //if author is blank , add anonymous
        if(data.quoteAuthor===''){
            authorText.innerText="Anonymous"
        }
        else{
            authorText.innerText = data.quoteAuthor;
        }
        //reduce font-size for long quotes
        if(data.quoteText.length>120){
            quoteText.classList.add('long-quote')
        }
        else{
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText=data.quoteText;
        console.log(data);
        // stop loader and show quote
        complete();
    }
    
    catch(error){
        getQuote();
        console.log('whoops, no Quote',error);
    }
}
//tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author= authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl,'_blank'); //_blank to open it in new tab

}
//Event listener
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);
//on load
getQuote();
