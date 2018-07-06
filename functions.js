


/*
	Cette fonction génère l'interface HTML en fonction 
	du contenu de la variable 'contacts' stockée dans 
	le localStorage.
*/
function generer_interface()
{
	var contacts = recuperer_contacts();

	if( ! contacts || contacts.length==0 )
	{
		$('div.alert-warning').show();
		$('table.table').hide();
		return;
	}

	$('div.alert-warning').hide();
	$('table.table').show().find('tbody').empty();

	for( var i=0 ; i<contacts.length ; i++ )
	{
		$('table.table tbody').append('<tr>\
			<td>' + contacts[i].id + '</td>\
			<td><input name="nom" value="' + contacts[i].nom + '" /></td>\
			<td><input name="prenom" value="' + contacts[i].prenom + '" /></td>\
			<td><input name="telephone" value="' + contacts[i].telephone + '" /></td>\
			<td><input name="email" value="' + contacts[i].email + '" /></td>\
			<td>\
				<button class="btn btn-success oi oi-circle-check" \
					data-id="' + contacts[i].id + '"></button>\
				<button class="btn btn-danger oi oi-circle-x" \
					data-id="' + contacts[i].id + '"></button>\
			</td>\
		</tr>');
	}
}




/*
	Cette fonction génère un identifiant unique, c'est-à-dire qu'il
	est différent de tous les ID déjà attribués aux contacts enregistrés
	dans le localStorage
*/
function generer_id_unique()
{
	var c = recuperer_contacts();

	do
	{
		var id = Math.floor( Math.random() * 199999999999 );
		var unique = true;

		if( ! c )	// cas du tout premier contact (le localStorage est vide)
		{
			return id;
		}

		for( var i=0 ; i<c.length ; i++ )
		{
			if( c['id'] == id )
			{
				unique = false;
			}
		}
	}
	while( unique == false );

	return id;
}

function recuperer_contacts()
{
	return JSON.parse( localStorage.getItem('contacts') );
}

function sauver_contacts(contacts)
{
	return localStorage.setItem('contacts', JSON.stringify(contacts) );
}

function ajouter_contact(personne)
{
	var contacts = recuperer_contacts();

	// si localStorage vide, il faut initialiser la variable !

	if( ! contacts )
	{
		contacts = [];
	}

	contacts.push(personne);

	return sauver_contacts(contacts);
}

function modifier_contact(id, personne)
{
	var contacts = recuperer_contacts();

	for( var i=0 ; i<contacts.length ; i++ )
	{
		if( contacts[i].id == id )
		{
			contacts[i] = personne;
		}
	}
	return sauver_contacts(contacts);
}

function supprimer_contact(id)
{
	var contacts = recuperer_contacts();

	for( var i=0 ; i<contacts.length ; i++ )
	{
		if( contacts[i].id == id )
		{
			contacts.splice(i,1);
		}
	}
	return sauver_contacts(contacts);
}

