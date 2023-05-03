const getBooks = async function() {
    const response = await fetch("https://www.googleapis.com/books/v1/volumes?q=harry&key=AIzaSyBB6WfqDdlr307S_gdPrvNq5UrIpedl_TA")
    // const response = await fetch("https://www.googleapis.com/books/v1/volumes?q=harry&startIndex=0&maxResults=40&key=AIzaSyBB6WfqDdlr307S_gdPrvNq5UrIpedl_TA")
    if (response.status == 200) {
        let data = await response.json();
        return data.items;
    } else {
        new Error(response.statusText)
    }
} 

const getBooksForUser = async function(request) {
    const response = await fetch("https://www.googleapis.com/books/v1/volumes?q="+request+"&printType=books&key=AIzaSyBB6WfqDdlr307S_gdPrvNq5UrIpedl_TA")
if (response.status == 200) {
    let data = await response.json();
    console.log(data)
    return data.items;
} else {
    new Error(response.statusText)
}
}   

const getBookByAutor = async function(name) {
    const response = await fetch("https://www.googleapis.com/books/v1/volumes?q=inauthor:"+name+"&printType=books&key=AIzaSyBB6WfqDdlr307S_gdPrvNq5UrIpedl_TA")
    if (response.status == 200) {
        let data = await response.json();
        return data.items;
    } else {
        new Error(response.statusText)
    }
}  

const getBookBySubject = async function(subject, startIndex) {
    const response = await fetch("https://www.googleapis.com/books/v1/volumes?q=subject:"+subject+"&startIndex="+startIndex+"&maxResults=40&printType=books&key=AIzaSyBB6WfqDdlr307S_gdPrvNq5UrIpedl_TA")
    if (response.status == 200) {
        let data = await response.json();
        return data.items;
    } else {
        new Error(response.statusText)
    }
}   



export { getBooks, getBookByAutor, getBookBySubject, getBooksForUser }
