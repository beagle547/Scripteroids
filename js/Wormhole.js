function Wormhole (PlayerID, X, Y, Duration, IndexRef) {
	var Instanz = this, Tunnel, Winkel = 0, BreiteS = 64, HoeheS = 64;
	this.Rad = BreiteS*.55;	this.ObjSize = BreiteS/2;
	this.OID = PlayerID-1; this.PosX = X; this.PosY = Y;
	this.GetIndex = function () { return IndexRef; };
	var FadingTime = 1000, Framerate = 60, Takt = setInterval( Wiederholen, 1000 / Framerate);
	var Spielfeld = document.getElementsByTagName('body')[0];
	var PlayerTunnel = './img/wormhole.png', PlayerTunnelFade;
	var Element = document.createElement('img');
	Element.src = PlayerTunnel;
	Element.style.top = Y + 'px';
	Element.style.left = X + 'px';
	Element.style.zIndex = '80';
	Element.style.transformOrigin = '50% 50%';
	Spielfeld.appendChild(Element);
	Tunnel = Element;
	Tunnel.style.position = 'fixed';
	setTimeout (Destroy, Duration);
	function Destroy () {
		clearInterval(Takt);
		Tunnel.parentNode.removeChild( Tunnel );
		Player[Instanz.OID].SetWHActive();
		for(var i = 0 ; i < Wurmloch.length ; i++)
			if(Wurmloch[i] == Instanz) {
				Wurmloch.splice(i, 1);
				break;
			}
	}
	function Wiederholen () {
		if(!gPause) { Winkel +=3 ;
		Tunnel.style.transform = 'rotate('+ Winkel + 'deg)'; }
	}
}