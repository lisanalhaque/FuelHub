$(function() {
  // Fuel Price Tracker
  
  if ($('#cityDropdown').length) {
    fuelPrices.forEach(fp => {
      $('#cityDropdown').append(`<option value="${fp.city}">${fp.city}</option>`);
    });
    function showPrices(city) {
      let fp = fuelPrices.find(f => f.city === city);
      let color = fp.petrol < fp.lastweekpetrol ? "bg-success" : "bg-danger";
      $('#priceCard').html(
        `<div class='card'>
          <div class='card-body'>
           <h5 class='card-title'>${fp.city}</h5>
           <p class='card-text'>Petrol: <span class='${color} p-2 text-light'>₹${fp.petrol}</span></p>
           <p class='card-text'>Diesel: ₹${fp.diesel}</p>
           <p class='card-text'>CNG: ₹${fp.cng}</p>
          </div>
        </div>`
      );
      $('#compareResult').html('');
    }
    $('#cityDropdown').val(fuelPrices[0].city).trigger('change');
    $('#cityDropdown').on('change', function(){ showPrices(this.value); });
    showPrices(fuelPrices[0].city);

    $('#compareBtn').click(function(){
      let city = $('#cityDropdown').val();
      let fp = fuelPrices.find(f => f.city === city);
      let diff = fp.petrol - fp.lastweekpetrol;
      let color = diff < 0 ? "success" : "danger";
      let text = diff === 0 ? "No change from last week." : `Petrol price ${diff<0?'decreased':'increased'} by ₹${Math.abs(diff).toFixed(2)}`;
      $('#compareResult').html(`<div class="alert alert-${color}">${text}</div>`);
    });
  }

  // Add fuel saving tips to any page with #tipsAccordion
  if ($('#tipsAccordion').length) {
    tips.forEach(function(tip,i){
      $('#tipsAccordion').append(
        `<div class="accordion-item">
           <h2 class="accordion-header" id="heading${i}">
             <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}">
               ${tip.title}
             </button>
           </h2>
           <div id="collapse${i}" class="accordion-collapse collapse" data-bs-parent="#tipsAccordion">
             <div class="accordion-body">${tip.desc}</div>
           </div>
        </div>`
      );
    });
  }
  
  // Navbar color toggle on scroll for better contrast over hero
  var $nav = $('.navbar');
  function checkScroll(){
    if ($(window).scrollTop() > 50) {
      $nav.addClass('scrolled');
    } else {
      $nav.removeClass('scrolled');
    }
  }
  checkScroll();
  $(window).on('scroll', checkScroll);

  // Car Comparison
  if ($('#car1').length && $('#car2').length) {
    cars.forEach((car, i) => {
      $('#car1, #car2').append(`<option value="${i}">${car.name}</option>`);
    });
    function compareCars() {
      let c1 = cars[$('#car1').val()];
      let c2 = cars[$('#car2').val()];
      let better = c1.mileage > c2.mileage ? 1 : (c1.mileage < c2.mileage ? 2 : 0);
      let cardHtml = function(car, highlight){
        return `<div class='card animate__animated animate__fadeIn ${highlight?"border-success":""}'>
          <div class='card-body'>
            <h5>${car.name}</h5>
            <p>Mileage: <span class=${highlight?'bg-success text-light p-1':''}>${car.mileage} km/l</span></p>
            <p>Fuel: ${car.fuel}</p>
            <p>Power: ${car.power}</p>
            <p>Price: ₹${car.price.toLocaleString()}</p>
          </div>
        </div>`;
      };
      $('#car1Card').html(cardHtml(cars[$('#car1').val()], better===1));
      $('#car2Card').html(cardHtml(cars[$('#car2').val()], better===2));
    }
    $('#car1, #car2').on('change', compareCars);
    $('#car1').val("0"); $('#car2').val("1"); compareCars();
    $('#swapBtn').click(function(){
      let tmp = $('#car1').val();
      $('#car1').val($('#car2').val());
      $('#car2').val(tmp); compareCars();
    });
    $('#resetCompare').click(function(){
      $('#car1').val("0"); $('#car2').val("1"); compareCars();
    });
  }

  // Maintenance Tips & Checklist
  if ($('#maintAccordion').length){
    tips.forEach(function(tip,i){
      $('#maintAccordion').append(
        `<div class="accordion-item">
           <h2 class="accordion-header" id="headingM${i}">
             <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseM${i}">
               ${tip.title}
             </button>
           </h2>
           <div id="collapseM${i}" class="accordion-collapse collapse" data-bs-parent="#maintAccordion">
             <div class="accordion-body">${tip.desc}</div>
           </div>
        </div>`
      );
    });
    checklistItems.forEach((item,i)=>{
      let checked = localStorage.getItem("check"+i)==="true" ? "checked" : "";
      $('#checklist').append(
        `<li class="list-group-item">
          <input type="checkbox" id="check${i}" ${checked}>
          <label for="check${i}" class="ms-2">${item}</label>
        </li>`
      );
      $(`#check${i}`).change(function(){
        localStorage.setItem("check"+i, this.checked);
      });
    });
  }

});
