function downloadbtn(type, data){
    if (type === 'html'){
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
        download('deskcode.html',htmldata)
    }
    else if(type === 'css'){
        download('deskcode.css',data)
    }
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

