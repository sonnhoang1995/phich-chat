(()=>{"use strict";var t={645:(t,i,e)=>{t.exports=e.p+"assets/25f0d16bb8cae6f8511d.png"},900:(t,i,e)=>{t.exports=e.p+"assets/ab0fbb598215fca0cc3f.png"},556:(t,i,e)=>{t.exports=e.p+"assets/950542022c57dd2e5ed1.png"}},i={};function e(s){var h=i[s];if(void 0!==h)return h.exports;var r=i[s]={exports:{}};return t[s](r,r.exports,e),r.exports}e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),(()=>{var t;e.g.importScripts&&(t=e.g.location+"");var i=e.g.document;if(!t&&i&&(i.currentScript&&(t=i.currentScript.src),!t)){var s=i.getElementsByTagName("script");s.length&&(t=s[s.length-1].src)}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),e.p=t})(),(()=>{var t=e(900);class i{constructor(t,i,e,s,h){this.currentFrame=0,this.radius=75,this.safeFrame=0,this.context=t,this.x=i,this.y=e,this.vx=s,this.vy=h,this.height=75,this.width=40,this.loadImage()}loadImage(){i.sprite||(i.sprite=new Image,i.sprite.src=t,i.sprite.onload=()=>{i.frameWidth=i.sprite.width/i.numColumns,i.frameHeight=i.sprite.height/i.numRows})}render(){this.safeFrame++,this.currentFrame>5&&(this.currentFrame=0),this.safeFrame>60&&(this.safeFrame=0);let t=this.currentFrame%i.numColumns,e=Math.floor(this.currentFrame/i.numColumns);this.context.drawImage(i.sprite,t*i.frameWidth,e*i.frameHeight,i.frameWidth,i.frameHeight,this.x-this.radius,this.y-this.radius-.4*this.radius,2*this.radius,2.42*this.radius),this.safeFrame%5==0&&this.currentFrame++}update(t){this.x+=this.vx*t}}i.numColumns=3,i.numRows=2,i.frameWidth=0,i.frameHeight=0;var s=e(645);class h{constructor(t,i,e,s,h){this.speed=2,this.context=t,this.x=i,this.y=e,this.vx=s,this.vy=h,this.height=400,this.width=1e3,this.loadImage()}update(t){}loadImage(){h.sprite=new Image,h.sprite.src=s}render(){this.x-=this.speed,this.context.drawImage(h.sprite,this.x,this.y),this.context.drawImage(h.sprite,this.x-this.width,this.y),this.x<0&&(this.x=1e3)}}var r=e(556);class n{constructor(t,i,e,s,h){this.currentFrame=0,this.radius=100,this.safeFrame=0,this.context=t,this.x=i,this.y=e,this.vx=s,this.vy=h,this.height=75,this.width=50,this.isJumping=!1,this.jumpLimit=125,this.loadImage()}update(t){this.jump(t)}jump(t){this.y=this.y>325?325:this.y,this.isJumping&&(this.y+=this.vy*t,this.y<this.jumpLimit&&(this.vy=-this.vy),this.y>325&&(this.isJumping=!1,this.vy=-this.vy))}loadImage(){n.sprite||(n.sprite=new Image,n.sprite.src=r,n.sprite.onload=()=>{n.frameWidth=n.sprite.width/n.numColumns,n.frameHeight=n.sprite.height/n.numRows})}render(){this.safeFrame++,this.currentFrame>5&&(this.currentFrame=0),this.safeFrame>60&&(this.safeFrame=0);let t=this.currentFrame%n.numColumns,i=Math.floor(this.currentFrame/n.numColumns);this.context.drawImage(n.sprite,t*n.frameWidth,i*n.frameHeight,n.frameWidth,n.frameHeight,this.x-this.radius,this.y-this.radius-.4*this.radius,2*this.radius,2.42*this.radius),this.safeFrame%5==0&&this.currentFrame++}}n.numColumns=3,n.numRows=2,n.frameWidth=0,n.frameHeight=0;class a{constructor(t){this.context=t}render(){this.context.font="22pt Arial",this.context.fillStyle="#000000",this.context.fillText("Thôi xong! Phát đã bị Tiểu Nhi bắt :(",125,50),this.context.beginPath(),this.context.rect(250,100,190,100),this.context.fillStyle="#FFFFFF",this.context.fillStyle="rgba(225,225,225,0.5)",this.context.fillRect(25,72,32,32),this.context.fill(),this.context.lineWidth=2,this.context.strokeStyle="#000000",this.context.stroke(),this.context.closePath(),this.context.font="24pt Kremlin Pro Web",this.context.fillStyle="#000000",this.context.fillText("Restart",300,165)}}(new class{constructor(){this.position=0,this.rAF_id=0,this.startTime=0,this.elapsedTime=0,this.fps=0,this.rectX=0,this.rectY=0,this.gameTimePassed=0,this.nhis=[],this.enemySpawnRate=90,this.canvas=document.getElementById("my-canvas"),this.canvas.height=this.canvas.width/1.875,this.context=this.canvas.getContext("2d"),this.canvas.tabIndex=1,this.canvas.focus(),this.phat=new n(this.context,100,325,0,-300),this.background=new h(this.context,0,-300,0,0),this.popup=new a(this.context)}initialize(){this.createWorld(),this.startTime=performance.now(),requestAnimationFrame(this.loop.bind(this))}createWorld(){this.nhis=[]}loop(t){this.elapsedTime=(t-this.startTime)/1e3,this.startTime=t,this.fps=Math.round(1/this.elapsedTime),this.elapsedTime=Math.min(this.elapsedTime,.1),this.spawnEnemy(),this.enemySpawnRate++;for(let t=0;t<this.nhis.length;t++)this.nhis[t].update(this.elapsedTime);if(this.handleInput(),this.detectCollision())return cancelAnimationFrame(this.rAF_id),this.popup.render(),!1;this.checkScore(),this.phat.update(this.elapsedTime),this.clearCanvas(),this.background.render();for(let t=0;t<this.nhis.length;t++)this.nhis[t].render();this.phat.render(),this.rAF_id=requestAnimationFrame(this.loop.bind(this))}clearCanvas(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height)}handleInput(){this.canvas.addEventListener("keydown",this.keyDownEventHandler.bind(this),!1),this.canvas.addEventListener("click",this.clickEventHandler.bind(this),!1),this.canvas.addEventListener("touchstart",this.touchEventHanlder.bind(this),!1)}keyDownEventHandler(t){return"Space"==t.code&&(this.phat.isJumping=!0),!1}clickEventHandler(t){if(this.detectCollision()){let i={x:250,y:100,width:190,height:100},e=this.getMousePosition(this.canvas,t);this.isInside(e,i)&&(this.phat=new n(this.context,100,325,0,-300),this.initialize())}}touchEventHanlder(t){return"touchstart"==t.type&&(this.phat.isJumping=!0),!1}detectCollision(){let t;for(let i=0;i<this.nhis.length;i++)if(t=this.nhis[i],this.rectIntersect(this.phat.x-75,this.phat.y+50,this.phat.width,this.phat.height,t.x,t.y,t.width,t.height))return!0}rectIntersect(t,i,e,s,h,r,n,a){return!(h>e+t||t>n+h||r>s+i||i>a+r)}checkScore(){this.nhis[0]&&this.nhis[0].x<0&&this.nhis.shift()}spawnEnemy(){let t=new i(this.context,1e3,325,-300,0);120==this.enemySpawnRate&&(this.nhis.push(t),this.enemySpawnRate=0)}getMousePosition(t,i){var e=t.getBoundingClientRect();return{x:i.clientX-e.left,y:i.clientY-e.top}}isInside(t,i){return t.x>i.x&&t.x<i.x+i.width&&t.y<i.y+i.height&&t.y>i.y}}).initialize()})()})();