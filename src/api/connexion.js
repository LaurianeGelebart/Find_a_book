const response = await fetch("https://www.my-url.com")
if (response.status == 200) {
    const data = response.json()
 } else {
    new Error(response.statusText)
}


const getBookData = async function() {
    const response = await fetch( "https://www.googleapis.com/books/v1/volumes?q=search-terms&key=your-API-key",{
                            method: "POST", 
                            headers: {
                                "Content-Type": "application/json" ,
                            },
                            body: JSON.stringify(myData) 
                            })
    if (response.status == 200) {
        return response.json()
    } else {
        new Error(response.statusText)
    }
}
export { getBookData }
