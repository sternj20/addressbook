window.onload = function(){
  // Buttons
  var quickAddBtn = document.getElementById('QuickAdd');
  var AddBtn = document.getElementById('Add');
  var cancelBtn = document.getElementById('Cancel');
  var quickAddFormDiv = document.querySelector('.quickaddForm');

  // Form Fields
  var fullname = document.getElementById("fullname");
  var phone = document.getElementById("phone");
  var address = document.getElementById("address");
  var city = document.getElementById("email");

  // Address Book Display
  var addBookDiv = document.querySelector(".addbook");

  // Create Storage Array
  var addressBook = [];

  // Event Listeners
  quickAddBtn.addEventListener("click", function(){
    quickAddFormDiv.style.display = "block";
  })

  cancelBtn.addEventListener("click", function(){
    quickAddFormDiv.style.display = "none";
  });

  AddBtn.addEventListener("click", addToBook);

  function jsonStructure(fullname,phone,address,city,email){
    this.fullname = fullname;
    this.phone = phone;
    this.address = address;
    this.city = city;
    this.email = email;
  }

  function addToBook(){
    var isNull = fullname.value!='' && phone.value!='' && city.value!='' && email.value!=''
    if(isNull){
      // Add contents of the form to the array & localstorage
      var obj = new jsonStructure(fullname.value,phone.value,address.value,city.value,email.value);
      addressBook.push(obj);
      localStorage['addbook'] = JSON.stringify(addressBook)
      // Hide the form panel
      quickAddFormDiv.style.display = "none";
      // Clear the form
      clearForm();
      // Updating & Displaying all records in the addressbook
      showAddressBook();
    }
  }

  function clearForm(){
    var frm = document.querySelectorAll(".formFields");
    for(var i in frm){
      frm[i].value ='';
    }
  }

  function showAddressBook(){
    // check if the key 'addbook' exists in localStorage or else create it
    // if it exists, load contents from the localStorage and loop > display it on the page
    if(localStorage['addbook'] === undefined){
      localStorage['addbook'] = "";
    } else {
        addressBook = JSON.parse(localStorage['addbook']);
        addBookDiv.innerHTML = '';
        for(var n in addressBook){
          var str = '<div class="entry">';
        			str += '<div class="name"><p>' + addressBook[n].fullname + '</p></div>';
        			str +=	'<div class="email"><p>' + addressBook[n].email + '</p></div>';
        			str +=	'<div class="phone"><p>' + addressBook[n].phone + '</p></div>';
        			str +=	'<div class="address"><p>' + addressBook[n].address + '</p></div>';
        			str +=	'<div class="city"><p>' + addressBook[n].city + '</p></div>';
        			str +=	'<div class="del"><a href="#" class = "delbutton" data-id="" + n + "">Delete</a></div>';
              str += '</div>';
              addBookDiv.innerHTML += str;

        }
    }
  }
}
