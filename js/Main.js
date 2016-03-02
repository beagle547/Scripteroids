function Main () {

	this.Continue = function () {
		menu.style.display = 'none';
		game.style.display = 'block';
		gPause = false;
	}
	this.New = function () {
		if(!gStarted || confirm('There is already a game open\nCancel current game and start a new one?')) {
			bNew.className = 'inactive';
			bNew.style.color = 'grey';
			bNew.style.borderColor = 'grey';
			menu.style.display = 'none';
			game.style.display = 'block';
			bContinue.className = '';
			bContinue.style.color = 'darkblue';
			bContinue.style.borderColor = 'black';
			NewGame()
		}
	}
	this.Options = function () {
		menu.style.display = 'none';
		sMenu.style.display = 'block';
	}
	this.Accept = function () {
		sMenu.style.display = 'none';
		menu.style.display = 'block';
	}
	
	this.ChangeMe = function ( Object ) {
		if(Object.className != 'inactive') {
			Object.style.color = Object.style.color == 'darkred' ? 'darkblue' : 'darkred' ;
			Object.style.borderColor = Object.style.borderColor == 'darkred' ? 'black' : 'darkred' ;
		}
	}
	this.ChangeMeUI = function ( Object ) {
		if(Object.className != 'inactive') {
			Object.style.color = Object.style.color == 'red' ? 'white' : 'red' ;
		}
	}
	
	this.Pause = function () {
		if(sMenu.style.display != 'block' && gStarted) {
			gPause = gPause ? false : true;
			menu.style.display = gPause ? 'block' : 'none';
			game.style.display = gPause ? 'none' : 'block';
		} else {
			sMenu.style.display = 'none';
			menu.style.display = 'block';
		}
	}

	var Tag = document.getElementsByTagName('body')[0];
	var Element, Content;
	
	// create menu
	Element = document.createElement('p');
	Element.innerHTML = 'Continue';
	Element.id = 'bContinue';
	Element.className = 'inactive';
	Element.style.color = 'grey';
	Element.style.borderColor = 'grey';
	Element.setAttribute('onclick', 'gMenu.Continue()');
	Element.setAttribute('onmouseleave', 'gMenu.ChangeMe(this)');
	Element.setAttribute('onmouseenter', 'gMenu.ChangeMe(this)');
	menu.appendChild(Element);
	
	Element = document.createElement('p');
	Element.innerHTML = 'New Game';
	Element.id = 'bNew';
	Element.setAttribute('onclick', 'gMenu.New()');
	Element.setAttribute('onmouseleave', 'gMenu.ChangeMe(this)');
	Element.setAttribute('onmouseenter', 'gMenu.ChangeMe(this)');
	menu.appendChild(Element);
	
	Element = document.createElement('p');
	Element.innerHTML = 'Options';
	Element.setAttribute('onclick', 'gMenu.Options()');
	Element.setAttribute('onmouseleave', 'gMenu.ChangeMe(this)');
	Element.setAttribute('onmouseenter', 'gMenu.ChangeMe(this)');
	menu.appendChild(Element);
	//
	
	// create options
	Element = document.createElement('p');
	Element.className = 'inactive';
	Element.style.borderColor = 'green';
	Element.setAttribute('onclick', '');
	Element.setAttribute('onmouseleave', 'gMenu.ChangeMe(this)');
	Element.setAttribute('onmouseenter', 'gMenu.ChangeMe(this)');
		Content = document.createElement('img');
		Content.src = './img/spritesheet.svg';
		Content.style.width = '64px';
		Content.style.height = '64px';
		Content.style.objectFit = 'none';
		Content.style.objectPosition = '0 0';
	Element.appendChild(Content);
	sMenu.appendChild(Element);
	
	Element = document.createElement('p');
	Element.setAttribute('onclick', '');
	Element.setAttribute('onmouseleave', 'gMenu.ChangeMe(this)');
	Element.setAttribute('onmouseenter', 'gMenu.ChangeMe(this)');
		Content = document.createElement('img');
		Content.src = './img/antrieb.svg';
		Content.style.width = '64px';
		Content.style.height = '64px';
		Content.style.objectFit = 'none';
		Content.style.objectPosition = '0 0';
	Element.appendChild(Content);
	sMenu.appendChild(Element);
	
	Element = document.createElement('p');
	Element.setAttribute('onclick', '');
	Element.setAttribute('onmouseleave', 'gMenu.ChangeMe(this)');
	Element.setAttribute('onmouseenter', 'gMenu.ChangeMe(this)');
		Content = document.createElement('img');
		Content.src = './img/antrieb.svg';
		Content.style.width = '64px';
		Content.style.height = '64px';
		Content.style.objectFit = 'none';
		Content.style.objectPosition = '0 0';
	Element.appendChild(Content);
	sMenu.appendChild(Element);
	
	Element = document.createElement('p');
	Element.innerHTML = 'Back';
	Element.setAttribute('onclick', 'gMenu.Accept()');
	Element.setAttribute('onmouseleave', 'gMenu.ChangeMe(this)');
	Element.setAttribute('onmouseenter', 'gMenu.ChangeMe(this)');
	sMenu.appendChild(Element);
	//
	
	// create movement controls
	Element = document.createElement('p');
	Element.innerHTML = 'Thruster';
	Element.id = 'bThrust';
	Element.setAttribute('onmouseleave', 'gMenu.ChangeMeUI(this)');
	Element.setAttribute('onmouseenter', 'gMenu.ChangeMeUI(this)');
	Element.setAttribute('onmouseleave', 'gPlayer.SetThrust(false)');
	Element.setAttribute('onclick', 'gPlayer.SetThrust(true)');
	controls.appendChild(Element);
	
	Element = document.createElement('p');
	Element.innerHTML = 'Left';
	Element.id = 'bLeft';
	Element.setAttribute('onmouseleave', 'gMenu.ChangeMeUI(this)');
	Element.setAttribute('onmouseenter', 'gMenu.ChangeMeUI(this)');
	Element.setAttribute('onmouseleave', 'gPlayer.SetLinks(false)');
	Element.setAttribute('onclick', 'gPlayer.SetLinks(true)');
	controls.appendChild(Element);
	
	Element = document.createElement('p');
	Element.innerHTML = 'Right';
	Element.id = 'bRight';
	Element.setAttribute('onmouseleave', 'gMenu.ChangeMeUI(this)');
	Element.setAttribute('onmouseenter', 'gMenu.ChangeMeUI(this)');
	Element.setAttribute('onmouseleave', 'gPlayer.SetRechts(false)');
	Element.setAttribute('onclick', 'gPlayer.SetRechts(true)');
	controls.appendChild(Element);
	
	Element = document.createElement('p');
	Element.innerHTML = 'Menu';
	Element.id = 'bPause';
	Element.setAttribute('onmouseleave', 'gMenu.ChangeMeUI(this)');
	Element.setAttribute('onmouseenter', 'gMenu.ChangeMeUI(this)');
	Element.setAttribute('onclick', 'gMenu.Pause()');
	controls.appendChild(Element);
	//
	
	// create combat controls
	Element = document.createElement('p');
	Element.innerHTML = 'Special';
	Element.id = 'bSpecial';
	Element.setAttribute('onclick', '');
	Element.setAttribute('onmouseleave', 'gMenu.ChangeMeUI(this)');
	Element.setAttribute('onmouseenter', 'gMenu.ChangeMeUI(this)');
	Element.setAttribute('onmouseleave', 'gPlayer.SetSpecial(false)');
	Element.setAttribute('onclick', 'gPlayer.SetSpecial(true)');
	abilities.appendChild(Element);
	
	Element = document.createElement('p');
	Element.innerHTML = 'Shoot';
	Element.id = 'bshoot';
	Element.setAttribute('onclick', '');
	Element.setAttribute('onmouseleave', 'gMenu.ChangeMeUI(this)');
	Element.setAttribute('onmouseenter', 'gMenu.ChangeMeUI(this)');
	Element.setAttribute('onmouseleave', 'gPlayer.SetShoot(false)');
	Element.setAttribute('onclick', 'gPlayer.SetShoot(true)');
	abilities.appendChild(Element);
	
	Element = document.createElement('p');
	Element.innerHTML = 'Shield';
	Element.id = 'bShield';
	Element.setAttribute('onclick', '');
	Element.setAttribute('onmouseleave', 'gMenu.ChangeMeUI(this)');
	Element.setAttribute('onmouseenter', 'gMenu.ChangeMeUI(this)');
	Element.setAttribute('onmouseleave', 'gPlayer.SetShield(false)');
	Element.setAttribute('onclick', 'gPlayer.SetShield(true)');
	abilities.appendChild(Element);
	//
	
	Tag.addEventListener('keydown', Main);
	setInterval(Wiederholen, 1000/30);
	
	function Main ( Ereignis ) {
		switch ( Ereignis.which ) {
			// ESC
			case 27 :
			// P
			case 80 :
				Pause();
			break;
			
			// 1 - New Game
			case 49 : gMenu.New();
			break;
			
			// F2 - Options
			case 50 : gMenu.Options();
			break;
			
		}
	}
	
	function Wiederholen () {	

	}

	function Ausgeben () {
		var Eintrag, Eintrag2, Inhalt, Ausgabe;
		var Alive = (Instanz.Explode) ? 'Destroyed' : 'Alive' ;
		var PIDC = (!Instanz.Explode) ? 'Alive' : 'Dead' ;
		var PIDE = 'EnergyH', PIDEn = 'Energy', PIDS = 'PScore';
		
		if(Instanz.Score >= 500) {
			PIDS = 'PScoreVH';
			StatsChanger (1);
		} else if(Instanz.Score >= 250) {
			PIDS = 'PScoreH';
			StatsChanger (2);
		} else if(Instanz.Score >= 100) {
			PIDS = 'PScoreM';
			StatsChanger (3);
		} else if(Instanz.Score >= 0) {
			PIDS = 'PScore';
			StatsChanger (0);
		} else {
			PIDS = 'PScoreL';
			StatsChanger (4);
		}
		
		Ausgabe = document.getElementById('player');
		
		if(Energy >= 65)
			PIDE = 'EnergyH';
		else if(Energy >= 35)
			PIDE = 'EnergyM';
		else if(Energy > -1)
			PIDE = 'EnergyL';
		
		Leeren( Ausgabe );
		
		if(PIDC == 'Alive') {
			Eintrag = document.createElement('li');
			Eintrag.id = PIDEn;
			Inhalt = document.createTextNode('Energy : ')			
			Eintrag.appendChild( Inhalt );
			Eintrag2 = document.createElement('span');
			Eintrag2.id = PIDE;
			Inhalt = document.createTextNode(Math.floor(Energy));
			Eintrag2.appendChild(Inhalt);
			Eintrag.appendChild(Eintrag2);
			Ausgabe.appendChild( Eintrag );
			Eintrag = document.createElement('li');
			Inhalt = document.createTextNode('Score : ');
			Eintrag.appendChild( Inhalt );
			Eintrag2 = document.createElement('span');
			Eintrag2.id = PIDS;
			Inhalt = document.createTextNode(Instanz.Score);
			Eintrag2.appendChild(Inhalt);
			Eintrag.appendChild(Eintrag2);
			Ausgabe.appendChild( Eintrag );
		} else {
			Eintrag = document.createElement('li');
			Inhalt = document.createTextNode('Press ');
			Eintrag.appendChild( Inhalt );
			Eintrag2 = document.createElement('span');
			Eintrag2.id = ColorID;
			Inhalt = document.createTextNode('Fire');
			Eintrag2.appendChild(Inhalt);
			Eintrag.appendChild(Eintrag2);
			Inhalt = document.createTextNode(' to join');
			Eintrag.appendChild( Inhalt );
			Ausgabe.appendChild( Eintrag );
		}
	}
}