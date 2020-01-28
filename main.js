
const ul = document.getElementById('dresses');
fetch('https://api.myjson.com/bins/evnom')
    .then((resp) => resp.json())
    .then(data => {

        let finalData = data.hits.filter(img => img.image)

         finalData.map(dress => {

                    function createElements(element) {
                        return document.createElement(element);
                    }
                            let li = createElements('li'),
                                img = createElements('img'),
                                span = createElements('span');
                                newSpan = createElements('p');
                            img.src = dress.image.link;
                            span.innerHTML = `${dress.product_name}`;
                            newSpan.innerHTML = `£${dress.price}.00`;
            
            function appendEl(parent, element) {
                return parent.appendChild(element);
            }
            appendEl(li, img);
            appendEl(li, span);
            appendEl(li, newSpan);
            appendEl( ul, li);
            

        })
    })
    .catch(error => 
        console.log(JSON.stringify(error))
    );








