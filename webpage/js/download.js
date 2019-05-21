function downloadbtn(type, data){
    // check the function input, it checks what type of data we want to download.
    if (type === 'html'){
        // for html files, create variables with opening tags, and the closing tags,
        var head = "<!DOCTYPE html>\n" +
            "<html lang=\"en\">\n" +
            "<head>\n" +
            "    <meta charset=\"UTF-8\">\n" +
            "    <title>DESKCODE</title>\n" +
            "    <link rel = \"stylesheet\"\n" +
            "          type = \"text/css\"\n" +
            "          href = \"deskcode.css\">\n" +
            "</head>\n" +
            "<body>\n";
        var end = "\n</body>\n" +
            "</html>";
        var htmldata = head + data + end;
        // merge user inputs from the text-box between opening html tag and html closing tag

        download('deskcode.html',htmldata)
        // call the download, call to download a file with the name deskcode.html,
        // and the merged data as the internal of the file
    }
    else if(type === 'css'){
        download('deskcode.css',data)
        // call the download, call to download a file with the name deskcode.css,
        // and the data from the text-box as the internal of the file
    }
}

function download(filename, text) {
    // function for downloading.
    var element = document.createElement('a');
    // create an <a> element

    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    // set the element created to be a downloadable link, with the content as inserted.

    element.style.display = 'none';
    // set the element to be invisible

    document.body.appendChild(element);
    // insert the element into html

    element.click();
    // javascript click the above element to star the download

    document.body.removeChild(element);
    // remove the above element that was inserted to the html(invisibly)
}

