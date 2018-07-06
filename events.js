
// ajouter un contact

$('#ajouterPopup .btn-primary').on('click', function(){
	var personne = {
		id: 		generer_id_unique(),
		nom: 		$('#nom').val(),
		prenom: 	$('#prenom').val(),
		telephone: 	$('#telephone').val(),
		email: 		$('#email').val()
	};

	ajouter_contact(personne);
	generer_interface();

	// vider les champs et fermer la popup
	$('#nom').val('');
	$('#prenom').val('');
	$('#telephone').val('');
	$('#email').val('');

	$('#ajouterPopup').modal('hide');
});



// supprimer un contact

$('table.table tbody').delegate('.btn-danger', 'click', function(){
	var id = $(this).data('id');

	supprimer_contact(id);
	generer_interface();
});



// modifier un contact

$('table.table tbody').delegate('.btn-success', 'click', function(){
	var id = $(this).data('id');

	var contact = {
		id: 		id,
		nom: 		$(this).parent().parent().find('input[name=nom]').val(),
		prenom: 	$(this).parent().parent().find('input[name=prenom]').val(),
		telephone: 	$(this).parent().parent().find('input[name=telephone]').val(),
		email: 		$(this).parent().parent().find('input[name=email]').val()
	};

	modifier_contact(id, contact);
	generer_interface();
});



// réinitialiser la liste des contacts

$('#reinit').on('click', function(){
	$.ajax('annuaire.json').done(function(data){
		sauver_contacts(data);
		generer_interface();
	});
});




// Rechercher

function rechercher(){
	generer_interface();

	var mot = $('nav form input').val();

	$('table.table tbody tr').hide();
	$('table.table tr:contains('+mot+')').show();
}

$('nav form input').on('keyup', rechercher);
$('nav form button').on('click', rechercher);




// Démarrage de l'application

$('div.alert-warning').hide();


