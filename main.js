
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
                                button = createElements('button')
                            img.src = dress.image.link;
                            span.innerHTML = `${dress.product_name}`;
                            newSpan.innerHTML = `£${dress.price}.00`;
                            button.innerHTML = 'add to bag';
            
            function appendEl(parent, element) {
                return parent.appendChild(element);
            }
            appendEl(li, img);
            appendEl(li, span);
            appendEl(li, newSpan);
            appendEl(li, button);
            appendEl( ul, li);
            

        })
    })
    .catch(error => 
        console.log(JSON.stringify(error))
    );








