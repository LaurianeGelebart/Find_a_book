const getBooks = async function() {
        const response = await fetch("https://www.googleapis.com/books/v1/volumes?q=harry&key=AIzaSyBB6WfqDdlr307S_gdPrvNq5UrIpedl_TA")
    if (response.status == 200) {
        let data = await response.json();
        return data;
    } else {
        new Error(response.statusText)
    }
}   

const getBookByAutor = async function(name) {
    const response = await fetch("https://www.googleapis.com/books/v1/volumes?q=inauthor:"+name+"&key=AIzaSyBB6WfqDdlr307S_gdPrvNq5UrIpedl_TA")
    if (response.status == 200) {
        let data = await response.json();
        return data;
    } else {
        new Error(response.statusText)
    }
}  

const getBookBySubject = async function(subject) {
    const response = await fetch("https://www.googleapis.com/books/v1/volumes?q=subject:"+subject+"&key=AIzaSyBB6WfqDdlr307S_gdPrvNq5UrIpedl_TA")
    if (response.status == 200) {
        let data = await response.json();
        return data;
    } else {
        new Error(response.statusText)
    }
}   



export { getBooks, getBookByAutor, getBookBySubject }
