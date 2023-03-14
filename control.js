const firebaseConfig = {
    apiKey: "AIzaSyCTIDZJKjQF8pZpOZKWix4g2YVGyT1f1Gw",
    authDomain: "shome-4ccd8.firebaseapp.com",
    databaseURL: "https://shome-4ccd8-default-rtdb.firebaseio.com",
    projectId: "shome-4ccd8",
    storageBucket: "shome-4ccd8.appspot.com",
    messagingSenderId: "534775718827",
    appId: "1:534775718827:web:e7cd398eec7f056ec2e8ee"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();

var checkboxes = document.querySelectorAll('.toggle');
var items = document.querySelectorAll('.item1, .item2, .item3, .item4, .item5, .item6');

for (var i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener('change', function() {
    var item = this.closest('.item1, .item2, .item3, .item4, .item5, .item6');
    item.classList.toggle('dark');
  });
}




// Lắng nghe sự kiện "click" trên các class toggle
var toggles = document.querySelectorAll('.toggle');
toggles.forEach(function(toggle) {
    toggle.addEventListener('click', function() {
        var id = this.id;
        var state = this.checked ? 'ON' : 'OFF';
        var toggleRef = database.ref('Devices/' + id );
        toggleRef.set(state);
    });
});

var devicesRef = database.ref('Devices');
devicesRef.on('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var id = childSnapshot.key;
    var state = childSnapshot.val();
    var toggle = document.querySelector('#' + id);
    if (toggle) {
      toggle.checked = state === 'ON';
    }
  });
});

//sensor
// Auto load Temperature-------------------------
firebase.database().ref("/Devices/nhietdo").on("value",function(snapshot){
  var nd = snapshot.val();  
  document.getElementById("nhietdo").innerHTML = nd +"°C";
  console.log(nd);
});
// Auto load Humidity---------------------------
firebase.database().ref("/Devices/doam").on("value",function(snapshot){
  var nd = snapshot.val();  
  document.getElementById("doam").innerHTML = nd+"%";
  console.log(nd);
});
// Auto load Gas-------------------------
firebase.database().ref("/Devices/gas").on("value",function(snapshot){
  var nd = snapshot.val();  
  document.getElementById("gas").innerHTML = nd+"%";
  console.log(nd);
});
// Auto load Light---------------------------
firebase.database().ref("/Devices/light").on("value",function(snapshot){
  var nd = snapshot.val();  
  document.getElementById("light").innerHTML = nd;
  console.log(nd);
});

// ve do thi
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [{
      label: 'Rainfall (mm)',
      data: [80, 100, 150, 200, 250, 300, 350, 400, 300, 200, 100, 80],
      backgroundColor: 'rgba(35, 158, 47, 0.81)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});
// Lặp qua từng phần tử trong mảng data và thay đổi giá trị ngẫu nhiên từ 50 đến 400
myChart.data.datasets[0].data.forEach(function(value, index) {
  myChart.data.datasets[0].data[index] = Math.floor(Math.random() * 351) + 50;
});

// Cập nhật biểu đồ
myChart.update();
