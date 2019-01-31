
var cardData = 
{
    img: "./assets/496x280.png",
    title: "Teste",
    desc: "Desc Teste",
    salary: 999.99
}

function addCard( {img, title, desc, salary} )
{
    var cardContent =
    `<div class="col-sm-12 col-md-6 col-lg-4">` +
    `    <div class="card">` +
    `        <img class="card-img-top" src="${img}" alt="Card image cap">` +
    `        <div class="card-body">` +
    `            <h5 class="card-title">${title}</h5>` +
    `            <!-- Card Desc -->` +
    `            <label for="descCard01" class="col-form-label col-form-label-sm font-weight-bold">` +
    `                Descrição:` +
    `            </label>` +
    `            <p class="card-text" id="descCard01">` +
    `                ${desc}` +
    `            </p>` +
    `            <!-- End Card Desc -->` +
    `            <!-- Card Salario -->` +
    `            <label for="salCard01" class="col-form-label col-form-label-sm font-weight-bold">` +
    `                Salário Base:` +
    `            </label>` +
    `            <p class="card-text" id="salCard01">` +
    `                R$ ${salary}` +
    `            </p>` +
    `            <!-- End Card Salario -->` +
    `            <!-- Card Buttons -->` +
    `            <button type="button" class="btn btn-warning"><i class="far fa-edit"></i></button>` +
    `            <button type="button" class="btn btn-danger"><i class="far fa-trash-alt"></i></button>` +
    `            <!-- End Card Buttons -->` +
    `        </div>` +
    `    </div>` +
    `</div>`;

    document.getElementById('cards').innerHTML += cardContent;
}