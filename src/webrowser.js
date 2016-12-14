tabris.ui.set("toolbarVisible", false);
var page = new tabris.Page({
  topLevel: true
}).open();
//---------------------------------------------------------------------------------------------------------------------------

var opened = false;
var LIST;
var worlds = [".com", ".fi", ".net", ".org", ".biz", ".exe", ".zip", ".rar", ".png", ".gif", ".bmp", ".jpg", ".jpeg", ".html", ".htm", ".css", ".mp3", ".mp4"];

var urlInput = new tabris.TextInput({
  layoutData: {left: 8, right: 48, top: -2},
  message: "Enter URL...",
  autoCorrect: true
}).on("tap", function(widget){
  opened = true
  list(widget)
}).on("accept", loadUrl).appendTo(page);

var webview = new tabris.WebView({
  layoutData: {left: 0, top: [urlInput, 4], right: 0, bottom: 0}
}).appendTo(page);

function loadUrl(){
    urlInput.get("text").trim();
  for(var world of worlds){
  if (urlInput.get("text").endsWith(world || "/")){
    webview.set("url", LIST = "http://www."+urlInput.get("text")+"/");
      	  var text = new tabris.TextView({
            id: "text",
  			left: 0, right: 0, height: 40, top: "prev() 1",
  			background: "white",
  			text: LIST,
            alignment: "center",
  			highlightOnTouch: true
 		  }).on("tap", function(widget){
    		 webview.set("url", this.get("text"))
             urlInput.set("text", webview.get("url"))
             opened = true
  			 list(widget)
          }).once("resize", function(widget){
             new tabris.Composite({
               id: "text",
               left: 0, right: 0, height: 2, top: [text, 1],
               background: "rgba(0,0,0,0.2)",
               cornerRadius: 60
             }).appendTo(lista)
  		  }).appendTo(lista);
        urlInput.set("text", webview.get("url"))
  } else if (urlInput.get("text").startsWith("http://www.") && urlInput.get("text").endsWith(world || "/")) {
    webview.set("url", LIST = urlInput.get("text"));
          var text1 = new tabris.TextView({
            id: "text",
  			left: 20, right: 20, height: 40, top: "prev() 1",
  			background: "white",
  			text: LIST,
            alignment: "center",
  			highlightOnTouch: true
  		  }).on("tap", function(widget){
    		 webview.set("url", this.get("text"))
             urlInput.set("text", webview.get("url"))
             opened = true
  			 list(widget)
          }).once("resize", function(widget){
             new tabris.Composite({
               id: "text",
               left: 0, right: 0, height: 2, top: [text1, 1],
               background: "rgba(0,0,0,0.2)",
               cornerRadius: 60
             }).appendTo(lista)
  		  }).appendTo(lista);
            urlInput.set("text", webview.get("url"))
  }
  }
  }

new tabris.Canvas({
  left: [urlInput, 8], top: 4, width: 35, height: 35,
  background: "white",
  cornerRadius: 7.25,
  elevation: 2,
  highlightOnTouch: true,
}).on("resize", function(canvas, bounds){
  var ctx = canvas.getContext("2d", bounds.width, bounds.height);
  ctx.fillStyle = "rgb(235,235,235)"
  ctx.fillRect(2.5, 5, 30, 5)
    ctx.fillRect(2.5, 15, 30, 5)
      ctx.fillRect(2.5, 25, 30, 5)
}).on("tap", function(widget){
  list(widget)
}).appendTo(page);

var lista = new tabris.Composite({
  left: 10, right: 10, top: [urlInput, 10], bottom: 10,
  elevation: 2,
  cornerRadius: 20,
  background: "white",
  opacity: 0,
  transform: {scaleX: 1, scaleY: 0}
}).once("resize", function(){
            var title = new tabris.TextView({
            id: "text",
  			left: 20, right: 20, height: 40, top: 5,
  			background: "white",
  			text: "History",
            font: "30px",
            alignment: "center",
            opacity: 0
          }).once("animationstart",function(){
             new tabris.Composite({
               id: "text",
               left: 0, right: 0, height: 2, top: [title, 1],
               background: "rgba(0,0,0,0.3)",
               cornerRadius: 20
             }).appendTo(lista);
            }).appendTo(lista);
  		  }).on("swipe:up", function(widget){
  list(widget)
}).appendTo(page);
      
function list(widget){
  if (opened == false){
  page.find("#text").animate({opacity: 1}, {delay: 300})
  lista.animate({opacity: 0.95, transform: {scaleX: 1, scaleY: 1}})
  opened = true
} else if (opened == true){
  page.find("#text").animate({opacity: 0})
  lista.animate({opacity: 0, transform: {scaleX: 1, scaleY: 0}}, {delay: 300})
  opened = false
}
}
