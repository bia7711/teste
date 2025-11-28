function nextPage(pageId) {
   
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    
    document.getElementById(pageId).classList.add('active');
}

function previousPage(pageId) {
   
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    
    document.getElementById(pageId).classList.add('active');
}
