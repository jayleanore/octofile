function renderUser() {
  var UID = document.getElementById("username").value; 
  var profile = "https://github.com/" + UID;
  var languages = [];
  
  $('.git-UID').html("<a href='" + profile + "'>" + UID + "</a>");

  //UID profile
  $.getJSON("https://api.github.com/users/" + UID, function(ID){

    avatar = ID.avatar_url;
    $('.git-avatar').html("<a href=" + profile + "><img src='" + avatar + "'></a>");

    //isactive box
    var dt = parseInt(ID.updated_at.substring(5,7));
    var d = new Date();
    var curr = d.getMonth() + 1;
    if (dt === curr || dt + 1 === curr || dt === 13 && curr === 01) {
      $('.git-active').removeClass('git-hidden');
    };
    $('.git-repos').html("<a href='" + "https://github.com/" + UID +"?tab=repositories" + "'>" + ID.public_repos + " Public Repositories</a>")
    if(ID.hireable) {
      $('.git-hireable').removeClass('git-hidden');
    }
  });

  Array.prototype.byFrequency= function(){
    var idx, t = [], L = this.length, freq = {};
    
    for(var i= 0; i<L; i++){
      idx = this[i];
      if(!idx) continue;
      
      if(freq[idx]== undefined) freq[idx]= 1;
      else freq[idx]++;
    }
   
    for(var p in freq) t[t.length] = p;
    
    return t.sort(function(x, y){
      return freq[y]-freq[x];
    });
  }
  
  //language aggregator
  $.getJSON("https://api.github.com/users/" + UID + "/repos", function(repos){
    repos.forEach (function(obj){
      if(obj.language && obj.language !== 'undefined') {
        languages.push(obj.language)
      }
    });
    var languagesSorted = languages.byFrequency();
    languagesOutput = "Develops in " + languagesSorted[0] + ", " + languagesSorted[1] + ", and " + languagesSorted[2];
    $('.git-languages').html(languagesOutput)
  });
}

document.addEventListener("keydown", function(event) {
  switch(event.keyCode){
    case 13:
      renderUser();
      break;
  }
});