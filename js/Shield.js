function Schield ( X, Y, Winkel, Duration) {
	var Instanz = this;
	var Protection, BreiteS = 16, HoeheS = 16;
	this.Rad = BreiteS*.47;
	this.Explode = false;
	this.PosX = X;
	this.PosY = Y;
	this.OID = 'Player';
	var DurationWarning = 1500;
	var DriftX = 0, DriftY = 0;
	var Impuls = 12, LifeTime = 2*60, Counter = 0;
	var Framerate = 60, TaktL, TaktL2, Takt = setInterval( Wiederholen, 1000 / Framerate), Locked = false;
	var Breite = window.innerWidth, Hoehe = window.innerHeight, Spielfeld = document.getElementById('mainframe');
	
	var PlayerShield = './img/shield.png', PlayerShieldFade = './img/shield_fade.gif';
	
	var Element = document.createElement('img');
	Element.src = PlayerShield;
	Element.name = Instanz.OID;
	Element.style.top = Instanz.PosY + 'px';
	Element.style.left = Instanz.PosX + 'px';
	Element.style.transform = 'rotate('+ Winkel + 'deg)';
	Element.style.zIndex = '100';
	Element.style.transformOrigin = '50% 50%';	
	Spielfeld.appendChild(Element);

	Protection = Element;
	Protection.style.display = 'block';
	Protection.style.position = 'fixed';
	
	TaktL  = setTimeout (Destroy, Duration);
	TaktL2 = setTimeout(Fading, Duration-DurationWarning);
	var TheTime = new Date();
	
	function Destroy () {
		Protection.parentNode.removeChild( Protection );
		gPlayer.ActiveShield = null;
		clearInterval(Takt);
	}
	
	function Fading () {
		Protection.src = PlayerShieldFade;
	}
	
	function Wiederholen () {
		if(!gPause) {
			if (!TaktL) {
				TaktL  = setTimeout (Destroy, Duration);
				TaktL2 = setTimeout(Fading, Math.abs(Duration-DurationWarning));
			}

			Bewegen();
		} else if(TaktL) {
			clearTimeout(TaktL);
			clearTimeout(TaktL2);
			TaktL = null;
			Duration -= (new Date() - TheTime);
		}
	}
	
	function Bewegen () {
		
		// Übertragen der Werte auf das Protection-Tag mittels CSS3
		Protection.style.transform = 'rotate('+ gPlayer.Winkel + 'deg)';
		Protection.style.top = gPlayer.PosY + 'px';
		Protection.style.left = gPlayer.PosX + 'px';
	}
}