/**
*
*  Events TagCommander
*
**/
(function (publics) {
    "use strict";
    var privates = {};

    privates.GlobalCart = null;
    privates.SearchBySuggestion = false;
    privates.includeOk = false;

    /**
    *
    *  Charge le container par defaut
    *  Excepte pour les pages à données async
    *
    **/
    privates.LoadContainer = function () {
        try {
            switch (tagSection) {
                case 'paniervide': // panier classique
                case 'panier':
                case 'livraison':
                case 'livraisonexpress':
                case 'recapitulatif':
                case 'commandeconfirm':
                case 'commandeannul':
                case 'facturation': // coupon
                case 'resultatrecherche': // search
                case 'irlproduits': // search
                case 'calculreservation': // voyage
                case 'devis':
                case 'paiement':
                case 'paiment2':
                case 'participants':
                case 'reservationannul':
                case 'reservationannulation':
                case 'reservationconfirm':
                case 'reservationnone':
                case 'reservationannulationconfirmation':
                case 'produit': // retour
                case 'produitconfirmation':
                case 'produitfautesrp':
                case 'produitfauteclient':
                case 'produitconfirmationlp':
                case 'produitconfirmationmr':
                    break;
                default:
                    privates.IncludeTagCommander(privates.TCFileEnum.TC_3);
                    break;
            }
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };

    /**
    *
    * Fonction pour event standard
    *
    **/
    privates.ClickStandard = function (container, category, action, label) {
        try {
            if (container == 3) {
                tc_events_3(this, "click_standard", { "category": category, "action": action, "label": label });
            }
            else if (container == 10) {
                tc_events_10(this, "click_standard", { "category": category, "action": action, "label": label });
            }
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };

    /**
    *
    *  Charge les evenements commun - header - menu
    *
    **/
    privates.LoadCommonEvents = function () {
        try {
            $(".ventes_all ").click(function () {
                privates.ClickStandard(3, "Navigation", "Univers", "Toutes les ventes");
            });
            $(".ventes_express").click(function () { //tc22
                privates.ClickStandard(3, "Navigation", "Univers", "Demain chez vous");
            });
            $(".nav__home_ventes").click(function () { //tc28
                privates.ClickStandard(3, "Navigation", "Univers", "Accueil");
            });
            $(".ventes_shopit").click(function () { //tc31
                privates.ClickStandard(3, "Navigation", "Univers", "Shop it");
            });
            $(".ventes_venir").click(function () { //tc32
                privates.ClickStandard(3, "Navigation", "Univers", "Ventes a venir");
            });
            $(".mode").click(function () { //tc13
                privates.ClickStandard(3, "Navigation", "Univers", "Mode");
            });
            $(".enfant").click(function () { //tc15
                privates.ClickStandard(3, "Navigation", "Univers", "Enfant");
            });
            $(".maison").click(function () { //tc16
                privates.ClickStandard(3, "Navigation", "Univers", "Maison");
            });
            $(".voyages").click(function () { //tc17
                privates.ClickStandard(3, "Navigation", "Univers", "Voyage");
            });
            $(".billet").click(function () { //tc21
                privates.ClickStandard(3, "Navigation", "Univers", "Billetterie");
            });
            $(".irl").click(function () { //tc14
                privates.ClickStandard(3, "Navigation", "Univers", "IRL");
            });
            $(".kiss").click(function () { //tc20
                privates.ClickStandard(3, "Navigation", "Univers", "Kiss");
            });
            $('.disconnect').click(function () { //tc80
                privates.ClickStandard(3, "Navigation", "Compte", "Deconnexion");
            });
            $('.achat_express').click(function () { //tc105
                privates.ClickStandard(3, "Navigation", "Mon Panier", "Achat Express");
            });
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };

    privates.GetUniversEC = function () {
        try {
            var select = $("ul.nav__liste a.rose");
            if (select.length > 0) {
                return " " + select[0].className.replace("rose ", "");
            }
            return " home";
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };

    /**
    *
    *   Enum des noms de fichier TagCommander
    *   
    **/
    privates.TCFileEnum = {
        TC_1: 1,
        TC_3: 3,
        TC_10: 10,
        properties: {
            1: { name: "//cdn.tagcommander.com/3160/tc_Showroomprive_1.js", value: 1 },
            3: { name: "//cdn.tagcommander.com/3160/tc_Showroomprive_3.js", value: 3 },
            10: { name: "//cdn.tagcommander.com/3160/tc_Showroomprive_10.js", value: 10 }
        }
    };

    /**
    *
    *   Envoi la liste des ventes et des produits au DataLayer
    *   sales : tableau de vente (data.Cart.sales)
    *   productList : provenance de la liste
    **/
    publics.SendSalesToTc = function (sales, productList) {
        if (sales !== undefined && sales != null) {
            tc_vars.product_array = [];
            var i = 1;
            // Conversion
            _.forEach(sales, function (s) {
                _.forEach(s.products, function (p) {
                    var product = {};
                    product.product_id = p.id;
                    product.product_unit_price = p.priceShowroom.toFixed(2).toString();
                    product.product_quantity = p.quantity;
                    product.product_position = i++;
                    product.product_name = p.name;
                    product.product_list = productList;
                    product.product_brand = p.saleName;
                    product.product_currency_code = GlobalJsVar.DeviseISO;
                    product.product_url_img = p.image;
                    product.product_universe_id = p.nmUniverId;
                    product.product_family_id = p.nmFamilyId;
                    product.product_sub_family_id = p.nmSubFamilyId;
                    // Maj du datalayer
                    tc_vars.product_array.push(product);
                });
            });
        } else {
            throw new Error("Parametre non definis !");
        }
    };

    /**
    *   Envoi la liste des produits au DataLayer
    *   products : tableau de produits
    *   textes : objet de libelle
    *   productList : provenance de la liste
    **/
    publics.SendProductsToTc = function (products, productList) {
        if (products) {
            tc_vars.product_array = [];

            var i = 1;
            _.forEach(products, function (p) {
                var product = {};
                product.product_id = p.id;
                product.product_unit_price = p.pv.toFixed(2).toString();
                product.product_position = i++;
                product.product_name = p.l;
                product.product_list = productList;
                //product.product_brand = p.vlib;
                product.product_currency_code = GlobalJsVar.DeviseISO;
                product.product_quantity = 0;
                _.forEach(p.t, function (t) {
                    product.product_quantity += t.qte;
                    if (t.qte > 0) {
                        product.product_disponible = 'Y';
                    }
                });
                product.product_page_type = p.tfp;
                product.product_discount = privates.GetDiscount(p.r);
                product.product_url_img = p.img[0];
                product.product_universe_id = p.nmu;
                product.product_family_id = p.nmf;
                product.product_sub_family_id = p.nmsf;
                tc_vars.product_array.push(product);
            });

        } else {
            throw new Error("Parametres non definis !");
        }
    };

    /**
    *
    *   Envoi la liste des produits recherches au DataLayer
    *   products : tableau de produits
    *   textes : objet de libelle
    *   productList : provenance de la liste
    **/
    publics.SendProductsSearchToTc = function (products) {
        tc_vars.product_array = [];
        var i = 0;
        privates.IncludeTagCommander(privates.TCFileEnum.TC_3, function () {
            _.forEach(products, function (p) {
                var product = {};
                product.product_id = p.id;
                product.product_unit_price = p.pv;
                product.product_quantity = p.q;
                product.product_position = i++;
                product.product_name = p.lib;
                product.product_list = 'search';
                product.product_brand = p.vlib;
                product.product_currency_code = GlobalJsVar.DeviseISO;
                product.product_disponible = p.dispo > 0 ? 'Y' : 'N';
                product.product_page_type = p.tfp;
                product.product_discount = privates.GetDiscount(p.rem);
                product.product_url_img = p.src;
                tc_vars.product_array.push(product);
            });
        });
    };

    /**
    *
    *   Envoi la liste des produits IRL au DataLayer
    *
    **/
    publics.SendProductsIrlToTc = function (meta, imgUrl) {
        if (products) {
            tc_vars.product_array = [];
            var i = 0;
            _.forEach(products, function (p) {
                var productTag = {
                    product_id: '',
                    product_name: '',
                    product_unit_price: '',
                    product_brand: '',
                    product_disponible: '',
                    product_recence_vente: '',
                    product_url_img: imgUrl
                }

                productTag.product_id = meta.id[0];;
                productTag.product_name = meta.produit_lib[0].replace(/<(.*)>/ig, " "); //suppression de toutes les balises html <...>
                productTag.product_unit_price = Math.floor(meta.pv[0]).toString();
                productTag.product_brand = meta.marque[0];
                meta.dispo[0] == "1" ? productTag.product_disponible = "Y" : productTag.product_disponible = "N";
                productTag.product_recence_vente = "vente en cours";

                tc_vars.product_array.push(productTag);
                var i = 1;
            });
        } else {
            throw new Error("Parametres non definis !");
        }
    };

    /**
    *
    *   Gere l'appel à IncludeTagCommander avec la fonction callback à la place de l'appelant
    *   jContainer : objet jQuery (conteneur des elements à binder)
    *   urlContainer: enum du fichier container a inclure (tc_showroomprive_10, _2, _3)
    *   className : nom de la classe des elements html
    *   idName : nom de l'id de l'element html
    *   
    **/
    publics.ManageIncludeTC = function (jContainer, className, idName) {
        try {
            if (className) {
                switch (className) {
                    case "type_keywords":
                        // tc171
                        jContainer.find(".type_keywords").click(function () {
                            privates.SearchBySuggestion = true;
                            privates.ClickStandard(3, "Moteur de recherche", "Auto-completion", "Suggestion|" + $(this).find('.match')[0].innerHTML);
                        });
                        break;
                    case "type_produit":
                        // tc172
                        jContainer.find(".type_produit").click(function () {
                            privates.SearchBySuggestion = true;
                            privates.ClickStandard(3, "Moteur de recherche", "Auto-completion", "Produit|" + $(this).find('.mdr_res_img').data("pid"));
                        });
                        break;
                    case "type_vente_lib":
                        // tc173
                        jContainer.find(".type_vente_lib").click(function () {
                            privates.SearchBySuggestion = true;
                            privates.ClickStandard(3, "Moteur de recherche", "Auto-completion", "Vente|" + $(this).find('.mdr_res_vente').data("vid"));
                        });
                        break;
                    case "icon-facebook":
                        // tc107
                        jContainer.find(".icon-facebook").click(function () {
                            var u = privates.GetUniversEC();
                            privates.ClickStandard(3, "Accueil" + u, "Partage|Facebook", "Vente|" + $(this).data("vpid"));
                        });
                        break;
                    case "icon-mail":
                        // tc108
                        jContainer.find(".icon-mail").click(function () {
                            var u = privates.GetUniversEC();
                            privates.ClickStandard(3, "Accueil" + u, "Partage|Email", "Vente|" + $(this).data("vpid"));
                        });
                        break;
                    case "icon-twitter":
                        // tc109
                        jContainer.find(".icon-twitter").click(function () {
                            var u = privates.GetUniversEC();
                            privates.ClickStandard(3, "Accueil" + u, "Partage|Twitter", "Vente|" + $(this).data("vpid"));
                        });
                        break;
                    case "icon-google_plus":
                        // tc109
                        jContainer.find(".icon-google_plus").click(function () {
                            var u = privates.GetUniversEC();
                            privates.ClickStandard(3, "Accueil" + u, "Partage|Google+", "Vente|" + $(this).data("vpid"));
                        });
                        break;
                }
            }
        } catch (e) {
            SRP.ConsoleLog(e);
        }

    };

    /**
    *
    *   Chargement de TagCommander
    *   urlContainer: enum du fichier container a inclure
    *   callback: fonction callback appele une fois le script charge
    *   
    **/
    privates.IncludeTagCommander = function (urlContainer, callback) {
        if (privates.includeOk) {
            return;
        }
        var url = privates.TCFileEnum.properties[urlContainer].name;

        /* on cree une balise<script type="text/javascript"></script> */
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;

        /* On dit d'executer cette fonction une fois que le script est charge */
        if (callback) {
            script.onreadystatechange = callback;
            script.onload = script.onreadystatechange;
        }

        /* On rajoute la balise script dans le head, ce qui demarre le telechargement */
        document.getElementsByTagName("body")[0].appendChild(script);
        privates.includeOk = true;
    };

    privates.GetContainer = function () {
        switch (tagSection) {
            case 'paniervide': // panier classique
            case 'panier':
            case 'livraison':
            case 'livraisonexpress':
            case 'recapitulatif':
            case 'commandeconfirm':
            case 'commandeannul':
            case 'facturation': // coupon
            case 'calculreservation': // voyage
            case 'devis':
            case 'paiement':
            case 'paiment2':
            case 'participants':
            case 'reservationannul':
            case 'reservationannulation':
            case 'reservationconfirm':
            case 'reservationnone':
            case 'reservationannulationconfirmation':
                return 10;
            default:
                return 3;
        }
    };

    privates.GetDiscount = function (discount) {
        if (discount == null || discount == 0) {
            return "";
        }
        var regexp = /^-/i;
        if (discount.toString().match(regexp)) {
            return discount;
        }
        return "-" + discount + "%";
    };

    /**
    *
    *   Changement de taille de produit par l'utilisateur
    *   productid: l'id du produit dont la taille a change
    *   taille: la taille choisi
    *   TC events tc47
    **/
    publics.ChangeWidthProduct = function (taille) {
        privates.ClickStandard(3, "Categorie", "Filtrer", "Taille|" + taille);
    };

    /**
    *
    *   Changement de taille de produit par l'utilisateur
    *   productid: l'id du produit dont la taille a change
    *   taille: la taille choisi
    *   TC events tc52, tc 53, tc54, tc55
    **/
    publics.AddSharedEvents = function () {
        try {
            $(".produit_invit_fb").click(function () {
                privates.ClickStandard(3, "Fiche Produit", "Partage|Facebook", "Produit|" + $(this).data("productid"));
            });
            $(".produit_invit_mail").click(function () {
                privates.ClickStandard(3, "Fiche Produit", "Partage|Email", "Produit|" + $(this).data("productid"));
            });
            $(".produit_invit_twitter").click(function () {
                privates.ClickStandard(3, "Fiche Produit", "Partage|Twitter", "Produit|" + $(this).data("productid"));
            });
            $(".produit_invit_google").click(function () {
                privates.ClickStandard(3, "Fiche Produit", "Partage|Google+", "Produit|" + $(this).data("productid"));
            });
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };

    /**
    *
    *   Ajout dans le panier
    *   productid: l'id du produit
    *   TC events tc75, tc183
    *
    **/
    publics.AddCartEvent = function (p, isSearch) {
        try {
            var category = "Categorie";
            if ($('.irl__push__carrousel').length)
                category = 'Accueil IRL';

            if (isSearch) {
                var param = SRP.GetParameterByName('boutique');
                category = (param && param.length > 0) ? "Boutique" : "Moteur de recherche";
            }

            var url = window.location.href.toLowerCase();
            if (url.includes('vente.aspx')) {
                category = "Recommandation|Accueil Vente"; //tc186
            } else if (url.includes('produit.aspx')) {
                category = "Recommandation|Fiche Produit"; //tc187
            } else if (url.includes('ajoutpanier.aspx')) {
                category = "Recommandation|Ajout Panier"; //tc188
            }

            privates.ClickStandard(3, category, "Ajout Panier", "Produit|" + p.id);
            privates.ClickStandard(3, "panier_0", p.vid, "");
            tc_events_3(this, 'add_product',
            {
                'product_id': p.id,
                'product_name': p.name,
                'product_brand': p.brand,
                'product_category': p.cat,
                'product_price': p.price,
                'product_currency_code': GlobalJsVar.DeviseISO,
                'product_variant': p.taille,
                'product_quantity': p.qte,
                'add_product_type': '',
                'product_discount': privates.GetDiscount(p.decote),
                'product_url_img': p.img
            });
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };

    /**
    *
    *   Evenement TagCommander lors de l'affichage du message d'incompatibilite mix
    *
    **/
    publics.ShowIncompatibilityCart = function () {
        try {
            if ($('.srp_overlay_valid').length > 0) {
                privates.IncludeTagCommander(privates.TCFileEnum.TC_3, function () {
                    // tc99
                    privates.ClickStandard(3, "Message", "Incompatibilite Mix Panier", "Affichage");
                    // tc101
                    $(".srp_overlay_close").click(function () {
                        privates.ClickStandard(3, "Message", "Incompatibilite Mix Panier", "Fermer");
                    });
                    // tc103
                    $(".srp_overlay_valid").click(function () {
                        privates.ClickStandard(3, "Message", "Incompatibilite Mix Panier", "Valider la commande");
                    });
                    $(".srp_overlay_continue").click(function () {
                        privates.ClickStandard(3, "Message", "Incompatibilite Mix Panier", "Valider la commande");
                    });
                }, false);
            }
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };

    /**
    *
    *   Evenement TagCommander lors de l'authentification utilisateur
    *
    **/
    publics.AuthenticateUser = function () {
        try {
            var absolutepath = $("#absolutepath").val() ? $("#absolutepath").val() : "";
            $(".login_fb").click(function () { //fb tc136 tc145 tc153 tc158 tc3
                privates.ClickStandard(3, absolutepath, "Facebook Connect", "Connexion");
            });
            $(".login_srp").click(function () { //srp tc137 tc146 tc154 tc159 tc4
                privates.ClickStandard(3, absolutepath, "Compte SRP", "Connexion");
            });
            $(".js-connexion_formulaire .js-connexion").click(function () { //srp tc137 tc146 tc154 tc159 tc4
                privates.ClickStandard(3, absolutepath, "Compte SRP", "Connexion");
            });
            $(".js-connexion_formulaire .js-connexion-fb").click(function () { //fb tc136 tc145 tc153 tc158 tc3
                privates.ClickStandard(3, absolutepath, "Facebook Connect", "Connexion");
            });
            // tc193
            $(".header__bloc_log__mdp_oubli").click(function () {
                privates.ClickStandard(3, absolutepath, "MDP", "MDP Oubli - Lien");
            });
            // tc194 iframe/passperdu
            $("#btn_Valider").click(function () {
                if (document.referrer.indexOf('/landing.aspx'))
                    privates.ClickStandard(3, "Landing", "MDP", "MDP Oubli - Envoi");
                else
                    privates.ClickStandard(3, window.parent.$("#absolutepath").val(), "MDP", "MDP Oubli - Envoi");
            });
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };

    /**
    *
    *   Evenement TagCommander lors de l'inscription utilisateur
    *
    **/
    publics.RegistrationUser = function () {
        try {
            var absolutepath = $("#absolutepath").val() ? $("#absolutepath").val() : "";
            $(".inscription_fb_intermediaire").click(function () { // fb tc140 tc149 tc157 tc162
                privates.ClickStandard(3, absolutepath, "Facebook Connect", "Inscription");
            });
            $(".inscription_fb").click(function () { //fb tc3 tc5 tc138 tc147 tc155 tc160
                // non fonctionnelle
                privates.ClickStandard(3, absolutepath, "Facebook Connect", "Inscription");
            });
            $("#srpInscription_LienInscription").click(function () { // srp tc140 tc149 tc157 tc162
                privates.ClickStandard(3, absolutepath, "Etape intermediaire", "Inscription");
            });
            $("#RegistrationTwoStep_LienInscription").click(function () { // srp tc140 tc149 tc157 tc162
                privates.ClickStandard(3, absolutepath, "Etape intermediaire", "Inscription");
            });
            $("#srpInscription_LienInscription2").click(function () { //srp tc4 tc139 tc148 tc156 tc161 tc140
                privates.ClickStandard(3, absolutepath, "Compte SRP", "Inscription");
            });
            $("#Registration_LienInscription").click(function () { //srp tc6
                privates.ClickStandard(3, absolutepath, "Compte SRP", "Inscription");
            });
            $("#RegistrationTwoStep_LienInscription2").click(function () { //srp tc6
                privates.ClickStandard(3, absolutepath, "Compte SRP", "Inscription");
            });
            $(".js-inscription_formulaire .js-inscription").click(function () { //srp tc4 tc139 tc148 tc156 tc161 tc140
                privates.ClickStandard(3, absolutepath, "Compte SRP", "Inscription");
            });
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };

    publics.InitWapsEvents = function () {
        try {
            var container = privates.GetContainer();
            var slots = wapsService.targetedSlots && wapsService.targetedSlots.length > 0 ? wapsService.targetedSlots : wapsService.container.slots;
            //events
            $(".waps-link")
                .click(function () {
                    var dataref = $(this).data('ref');
                    var s = {};
                    _.forEach(slots,
                        function (s) {
                            _.forEach(s.Medias,
                                function (media) {
                                    if (media.clickRef == dataref) {
                                        if (container == 3) {
                                            tc_events_3(this,
                                                'promotion_click',
                                                {
                                                    'promotion_id': media.clickRef.split('-')[0],
                                                    'promotion_name': media.campaignName || '',
                                                    'promotion_creative': media.mediaId,
                                                    'promotion_position': media.slotId
                                                });
                                        } else {
                                            tc_events_10(this,
                                                'promotion_click',
                                                {
                                                    'promotion_id': media.clickRef.split('-')[0],
                                                    'promotion_name': media.campaignName || '',
                                                    'promotion_creative': media.mediaId,
                                                    'promotion_position': media.slotId
                                                });
                                        }
                                    }
                                });
                        });
                });
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };

    publics.InitWapsData = function () {
        try {
            //datalayer
            tc_vars.promotion_array = [];
            var slots = wapsService.targetedSlots || {};
            _.forEach(slots,
                function (s) {
                    _.forEach(s.Medias,
                        function (m) {
                            tc_vars.promotion_array.push({
                                'promotion_id': m.clickRef.split('-')[0],
                                'promotion_name': m.campaignName || '',
                                'promotion_creative': m.mediaId,
                                'promotion_position': m.slotId
                            });
                        });
                });
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };

    /**
    *
    *   Evenement TagCommander lors de la recherche
    *
    **/
    publics.AddSearchEvent = function () {
        if (!privates.SearchBySuggestion) { // bouton dans TopSearchField.ascx - tc182
            privates.ClickStandard(3, "Moteur de recherche", "Recherche", "Recherche|" + $('.champ_mdr').val());
        }
    };

    /**
    *
    *   Evenement TagCommander lors de la confirmation de suppression de panier
    *
    **/
    publics.DeleteCartEvent = function (data) {
        privates.IncludeTagCommander(privates.TCFileEnum.TC_10, function () {
            $(data.Cart.sales).each(function (index) {
                var products = JSON.stringify(this.products, null, 2);
                // tc 301
                tc_events_10(this, "remove_product", { "category": "Panier roll over", "action": "Supprimer panier", "label": "Produit|" + products });
            });
        });
    };

    /**
    *
    *  Initialise les tags des filtres
    *
    **/
    publics.InitializeTagCommanderFilters = function () {
        try {

            // Categories - tc174
            $("#facets_facette_sf_2 input").click(function () {
                privates.ClickStandard(3, "Moteur de recherche", "Filtrer", "Categorie|" + $(this).data("value"))
            });
            // Type - tc 175
            $("#facets_facette_sex input").click(function () {
                privates.ClickStandard(3, "Moteur de recherche", "Filtrer", "Type|" + $(this).data("value"))
            });
            // Livraison - tc 176
            $("#facets_facette_livraison input").click(function () {
                privates.ClickStandard(3, "Moteur de recherche", "Filtrer", "Livraison|" + $(this).data("value"))
            });
            // Couleur - tc177
            $("#facets_facette_coul input").click(function () {
                privates.ClickStandard(3, "Moteur de recherche", "Filtrer", "Couleur|" + $(this).data("value"))
            });
            // Matiere - tc178
            $("#facets_facette_mat input").click(function () {
                privates.ClickStandard(3, "Moteur de recherche", "Filtrer", "Matiere|" + $(this).data("value"))
            });
            // Taille - tc179
            $("#facets_facette_taille_lib_ref input").click(function () {
                privates.ClickStandard(3, "Moteur de recherche", "Filtrer", "Taille|" + $(this).data("value"))
            });
            // Vente - tc180
            $("#facets_facette_vente_lib input").click(function () {
                privates.ClickStandard(3, "Moteur de recherche", "Filtrer", "Vente|" + $(this).data("value"))
            });
            // Prix - tc181
            //$('.gamme_prix').click(function () {
            //    var uiValues = $("#slider-range").slider("values");
            //    var searchMin = parseInt(uiValues[0]);
            //    var searchMax = parseInt(uiValues[1]);
            //    privates.ClickStandard(3, "Moteur de recherche", "action": "Filtrer", "label": "Prix|" + searchMin + "-" + searchMax })
            //});
            // Tri - tc217, tc218, tc219, tc220
            $("#mdr_tri").unbind("change.eventTag");
            $("#mdr_tri").bind("change.eventTag", function () {
                privates.ClickStandard(3, "Moteur de recherche", "Trier", $("#mdr_tri option:selected").text())
            });
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    }

    /**
    *
    *  Initialise le tag du filtre du prix
    *
    **/
    publics.ExecEventFilterPrice = function (minPrice, maxPrice) {
        privates.ClickStandard(3, "Moteur de recherche", "Filtrer", "Prix|" + minPrice + "-" + maxPrice);
    };

    /**
    *
    *  Leve un evenement apres avoir inserer infinity
    *
    **/
    publics.InsertInfinityEvents = function (data) {
        // Evenement au clic sur l'ajout d'infinity - tc87 & tc83
        var id = productInfinity || 0;
        privates.ClickStandard(10, "Recommandation|Panier 1" + (data.Cart.sales.length > 2 ? " Mix" : ""), "Ajout Panier", "Infinity|" + id);
    };

    /**
    *
    *   Evenement lors de la suppression d'un produit du panier
    *   
    **/
    publics.DeleteProduct = function () {
        $(".delete_product").click(function () {
            try {
                tc_events_10(this, "remove_product", { "category": "Panier_1", "action": "Supprimer element panier", "label": "Produit|" + $(this).data("product") });
            } catch (e) {
                SRP.ConsoleLog(e);
            }
        });
    };

    /**
    *
    *   Evenement lors de l'affichage de la popup infinity
    *   
    **/
    publics.DisplayInfinityEvents = function (isMix) {
        // Evenement au clic sur "En savoir plus" tc86 & tc81
        var id = productInfinity || 0;
        privates.ClickStandard(10, "Recommandation|Panier 1" + (isMix ? " Mix" : ""), "Infinity", "Infinity|" + id);
        window._uxa = window._uxa || [];
        window._uxa.push(['trackPageview', window.location.pathname + window.location.hash.replace('#', '?__') + '?cs-popin-infinity']);
    };

    /**
    *
    *   Evenement lors de l'affichage du panier - un evenement par vente
    *   
    **/
    publics.EventsFromCartPerSale = function (sales, etapePanier) {
        try {
            privates.IncludeTagCommander(privates.TCFileEnum.TC_10, function () {
                var cat;

                switch (etapePanier) {
                    case "1":
                        sales.length > 1 ? cat = "panier_1m" : cat = "panier_1";
                        break;
                    case "2":
                        sales.length > 1 ? cat = "panier_2m" : cat = "panier_2";
                        break;
                    case "2bm":
                        cat = "panier_2bm";
                        break
                    case "3":
                        sales.length > 1 ? cat = "panier_3m" : cat = "panier_3";
                        break;
                    case "5":
                        sales.length > 1 ? cat = "panier_5m" : cat = "panier_5";
                        break;
                    default:
                }

                $.each(sales, function (index) {
                    // panier_1 - tc90 - tc94
                    // panier_2 - tc91 - tc95
                    // panier_3 - tc92 - tc97
                    privates.ClickStandard(10, cat, this.id, "");
                });
            });
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };

    /**
    *
    *   Evenement lors de l'affichage de la confirmation de vente
    *   
    **/
    publics.EventFromConfirmation = function () {
        try {
            privates.IncludeTagCommander(privates.TCFileEnum.TC_10, function () {
                var cat = 'panier_5';
                if (tc_vars.order_global_array.length > 1) {
                    cat = 'panier_5m';
                }
                $.each(tc_vars.order_global_array, function (index) {
                    // panier_5 - tc93 - tc98
                    privates.ClickStandard(10, cat, this.order_sale_id, "");
                });
                if (tc_vars.order_global_array.length < 1) {
                    privates.ClickStandard(10, 'Technique', 'Erreur', 'CommandeConfirm introuvable');
                }
            });
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    }

    /**
    *
    *   Evenements de la page filleul - abonnement fait au chargement
    *   
    **/
    publics.InitFilleuls = function () {
        try {
            // tc33, tc34, tc35, tc375
            $("#cta_send_invit").click(function () { privates.ClickStandard(3, "Mon Compte", "Parrainage|Email", "Invitation") });
            $("div > .filleuls-partage > .filleuls-partage__item + .icon-facebook").click(function () { privates.ClickStandard(3, "Mon Compte", "Parrainage|Facebook", "Invitation") });
            $("div > .filleuls-partage > .filleuls-partage__item + .icon-twitter").click(function () { privates.ClickStandard(3, "Mon Compte", "Parrainage|Twitter", "Invitation") });
            $("div > .filleuls-partage > .filleuls-partage__item + .icon-google_plus").click(function () { privates.ClickStandard(3, "Mon Compte", "Parrainage|Google", "Invitation") });
            $("#filleulCopyCode").click(function () { privates.ClickStandard(3, "Mon Compte", "Parrainage", "Copier lien") });
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };

    /**
    *
    *   Evenements de la page filleul - abonnement fait pour relance
    *   
    **/
    publics.InitRelanceFilleuls = function () {
        try {
            // tc36
            $("td.filleuls-list__cell > div.btn--medium").click(function () { privates.ClickStandard(3, "Mon Compte", "Parrainage|Email", "Relance") });
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };

    /**
    *
    *   Evenements de la page filleul - abonnement fait au chargement
    *   
    **/
    publics.InitMesNewsletters = function () {
        try {
            // tc37, tc38, tc39, tc40
            $(".moncompte_news_day").click(function () {
                privates.ClickStandard(3, "Mon Compte", "Newsletter|Quotidienne", $(this).is(':checked') ? "oui" : "non")
            });
            $(".moncompte_news_week").click(function () {
                privates.ClickStandard(3, "Mon Compte", "Newsletter|Hebdomadaire", $(this).is(':checked') ? "oui" : "non")
            });
            $(".moncompte_news_trip").click(function () {
                privates.ClickStandard(3, "Mon Compte", "Newsletter|Voyage", $(this).is(':checked') ? "oui" : "non")
            });
            $(".moncompte_news_partner").click(function () {
                privates.ClickStandard(3, "Mon Compte", "Newsletter|Partenaires", $(this).is(':checked') ? "oui" : "non")
            });
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };

    /**
    *
    *   Evenements de la page FicheInfinity - abonnement fait au chargement
    *   
    **/
    publics.InitFicheInfinity = function () {
        try {
            // tc82
            var id = productInfinity || 0;
            $("#lienAbonnement").click(function () {
                privates.ClickStandard(3, "Fiche Produit", "Ajout Panier", "Infinity|" + id);
            });
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };

    publics.AddInfinitySuccessful = function (response) {
        try {
            // tc89 & tc85
            var id = productInfinity || 0;
            privates.ClickStandard(10, "Recommandation|Panier 2" + (response.Cart.sales.length > 2 ? " Mix" : ""), "Ajout Panier", "Infinity|" + id);
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };

    publics.SavoirPlusEvents = function (isMix) {
        // tc84 & tc88
        var id = productInfinity || 0;
        privates.ClickStandard(10, "Recommandation|Panier 2" + (isMix ? " Mix" : ""), "Infinity", "Infinity|" + id);
    };

    /**
    *
    *  Evenement d'ajout de produit au panier
    *  Leve au clic sur 'ajouter au panier'
    *
    **/
    publics.AddToCart = function () {
        // tc77
        $(".fp__cta").click(function () {
            try {
                var cell = $(this);
                privates.ClickStandard(3, "panier_0", cell.data('saleid'), "");
                privates.ClickStandard(3, "Fiche Produit", "Ajout Panier", "Produit|" + cell.data('productid'));
                tc_events_3(this, 'add_product',
                {
                    'product_id': cell.data('productid'),
                    'product_name': cell.data('name'),
                    'product_brand': cell.data('salename'),
                    'product_category': cell.data('gammename'),
                    'product_price': cell.data('priceshowroom'),
                    'product_currency_code': GlobalJsVar.DeviseISO,
                    'product_variant': $('div.fp__select_taille option:selected').val().split('(')[0].trim(),
                    'product_quantity': $('div.fp__select_quantite option:selected').val(),
                    'add_product_type': cell.data('type'),
                    'product_discount': privates.GetDiscount(cell.data('discount')),
                    'product_url_img': cell.data('imageurl')
                });
            } catch (e) {
                SRP.ConsoleLog(e)
            }
        });
    };

    /**
    *
    *  Evenement de chargement de page de fiche produit
    *
    **/
    publics.ShowProduct = function () {
        privates.IncludeTagCommander(privates.TCFileEnum.TC_3, function () {
            tc_events_3(this, 'product_click',
            {
                'product_id': $('.fp__cta').data('productid'),
                'product_name': $('.fp__cta').data('name'),
                'product_brand': $('.fp__cta').data('salename'),
                'product_category': $('.fp__cta').data('gammename'),
                'product_price': $('.fp__cta').data('priceshowroom'),
                'product_list': 'ficheproduit',
                'product_position': null,
                'product_currency_code': GlobalJsVar.DeviseISO
            });
        });
    };

    /**
    *
    *  Reservation d'un voyage - Consultation des prix
    *
    **/
    publics.TripBooking = function () {
        $(".consult_prix").click(function () {
            // tc120
            privates.ClickStandard(3, "Fiche Produit Voyage", "Reservation_0", "Produit|" + $(this).data("productid"));
        });
    };

    /**
    *
    *   Evenements de la page FicheProduit - abonnement fait au chargement
    *   
    **/
    publics.InitFicheProduit = function () {
        try {
            // tc279
            $(".nav_fp__prev_item").click(function () {
                privates.ClickStandard(3, 'Navigation', 'Fiche Produit', 'Previous item');
            });
            $(".nav_fp__next_item").click(function () {
                privates.ClickStandard(3, 'Navigation', 'Fiche Produit', 'Next item');
            });
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };

    /**
    *
    *   Evenements de la page Devis - abonnement fait au chargement
    *   
    **/
    publics.InitDevis = function () {
        try {
            // tc121
            privates.IncludeTagCommander(privates.TCFileEnum.TC_10, function () {
                privates.ClickStandard(10, "Tunnel Voyage", "Reservation_1", "Vente|" + SRP.GetParameterByName("vente"));
            });
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };

    /**
    *
    *   Evenements de la page Participants - abonnement fait au chargement
    *   
    **/
    publics.InitParticipants = function () {
        try {
            // tc122
            privates.IncludeTagCommander(privates.TCFileEnum.TC_10, function () {
                privates.ClickStandard(10, "Tunnel Voyage", "Reservation_2", "Vente|" + tc_vars.page_sale_id);
            });
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };

    /**
    *
    *   Evenements de la page Paiements - abonnement fait au chargement
    *   
    **/
    publics.InitPaiement = function () {
        try {
            // tc123
            privates.IncludeTagCommander(privates.TCFileEnum.TC_10, function () {
                privates.ClickStandard(10, "Tunnel Voyage", "Reservation_3", "Vente|" + $("#getVpid").val());
            });
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };

    /**
    *
    *   Evenements de la page AccueilVoyage - abonnement fait au chargement
    *   
    **/
    publics.InitAccueilVoyage = function () {
        $(".critere_destination").click(function () { //tc111
            privates.ClickStandard(3, "critereVoyage", $(this).attr('id'), $(this).is(':checked'));
        });
        $(".critere_thematique").click(function () { //tc112
            privates.ClickStandard(3, "critereVoyage", $(this).attr('id'), $(this).is(':checked'));
        });
        $('.critere_duree').click(function () { //tc113
            privates.ClickStandard(3, "critereVoyage", $(this).attr('id'), $(this).is(':checked'));
        });
        $("#vacances").change(function () { //tc114
            privates.ClickStandard(3, "critereVoyage", "vacances", $(this).val());
        });
        $("#flexibilite").change(function () { //tc115
            privates.ClickStandard(3, "critereVoyage", "flexibilite", $(this).val());
        });
        $(".critere_ville").click(function () { //tc116
            privates.ClickStandard(3, "critereVoyage", $(this).attr('id'), $(this).is(':checked'));
        });
        $(".critere_pension").click(function () { //tc117
            privates.ClickStandard(3, "critereVoyage", $(this).attr('id'), $(this).is(':checked'));
        });
        $(".critere_budget").click(function () { //tc118
            privates.ClickStandard(3, "critereVoyage", $(this).attr('id'), $(this).is(':checked'));
        });
    };

    publics.InitAccueilBilletterie = function () {
        $(".tc201").click(function () { //t201
            privates.ClickStandard(3, "critereBilletterie", $(this).attr('id'), $(this).is(':checked'));
        });
        $(".tc202").click(function () { //t202
            privates.ClickStandard(3, "critereBilletterie", $(this).attr('id'), $(this).is(':checked'));
        });
        $("#exclu").click(function () { //t203
            privates.ClickStandard(3, "critereBilletterie", "Tarifs exclusifs", $(this).is(':checked'));
        });
    };

    publics.InitAccueilVoyageAP = function () {
        $('#RESANEO').click(function () { //tc262
            privates.ClickStandard(3, "Billetterie aerienne", "Accueil Voyage", "Encars");
        });
    };

    publics.InitHomeCarrousel = function () {
        $('.jcarousel a').click(function () { //tc119
            try {
                if ($(this)[0].firstChild.id == "401" || $(this)[0].firstChild.id == "423") {
                    privates.ClickStandard(3, "Billetterie aerienne", "Accueil Voyage", "Slider");
                }
                else {
                    var nom = window.location.pathname;
                    nom = nom.split("/");
                    nom = nom[nom.length - 1];
                    nom = nom.substr(0, nom.lastIndexOf("."));
                    nom = nom.replace(new RegExp("(%20|_|-)", "g"), "");
                    nom = nom.toLowerCase().replace("accueil", "");
                    nom = nom.charAt(0).toUpperCase() + nom.substring(1).toLowerCase();
                    privates.ClickStandard(3, "Slider" + nom, "Position " + $(this).data("pos"), "Vente|" + SRP.GetParameterByName("vpId", $(this).attr("href")));
                }
            } catch (e) {
                SRP.ConsoleLog(e);
            }
        });
    };

    /**
    *
    *   Evenements de la page ReservationConfirm - abonnement fait au chargement
    *   
    **/
    publics.InitReservationConfirm = function () {
        try {
            privates.IncludeTagCommander(privates.TCFileEnum.TC_10, function () {
                // tc124
                $(".getVpid").each(function (index) {
                    privates.ClickStandard(10, "Tunnel Voyage", "Reservation_5", "Vente|" + $(this).val());
                });
                $("#cph_middle_lienFlight").click(function () {
                    privates.ClickStandard(10, "Billetterie aerienne", "Reservation_5", "Encars");
                });
            });
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };

    /**
    *
    *   Evenements de la page ProduitConfirmation - abonnement fait au chargement
    *   
    **/
    publics.InitProduit = function () {
        try {
            // tc125
            privates.IncludeTagCommander(privates.TCFileEnum.TC_3, function () {
                privates.ClickStandard(3, "Retour Web", "Retour_1", "Vente|" + tc_vars.page_sale_id);
            });
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };

    /**
    *
    *   Evenements de la page ProduitConfirmation - abonnement fait au chargement
    *   
    **/
    publics.InitProduitConfirmation = function () {
        try {
            //tc126
            privates.IncludeTagCommander(privates.TCFileEnum.TC_3, function () {
                $(".getVpid").each(function (index) {
                    privates.ClickStandard(3, "Retour Web", "Retour_2", "Vente|" + $(this).val());
                });
            });
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };

    /**
    *
    *   Evenements de la page ProduitFauteSRP - abonnement fait au chargement
    *   
    **/
    publics.InitProduitFauteSRP = function () {
        try {
            //tc127
            privates.IncludeTagCommander(privates.TCFileEnum.TC_3, function () {
                $(".getVpid").each(function (index) {
                    privates.ClickStandard(3, "Retour Web", "Retour_3|Faute SRP", "Vente|" + $(this).val());
                });
            });
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };

    /**
    *
    *   Evenements de la page ProduitFauteClient - abonnement fait au chargement
    *   
    **/
    publics.InitProduitFauteClient = function () {
        try {
            //tc128
            privates.IncludeTagCommander(privates.TCFileEnum.TC_3, function () {
                $(".getVpid").each(function (index) {
                    privates.ClickStandard(3, "Retour Web", "Retour_3|Faute Client", "Vente|" + $(this).val());
                });
            });
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };

    /**
    *
    *   Evenements de la page ProduitConfirmationMR - abonnement fait au chargement
    *   
    **/
    publics.InitProduitConfirmationMR = function () {
        try {
            //tc129 
            privates.IncludeTagCommander(privates.TCFileEnum.TC_3, function () {
                $(".getVpid").each(function (index) {
                    privates.ClickStandard(3, "Retour Web", "Retour_4|Confirmation Mondial Relay", "Vente|" + $(this).val());
                });
            });
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };

    /**
    *
    *   Evenements de la page ProduitConfirmationLP - abonnement fait au chargement
    *   
    **/
    publics.InitProduitConfirmationLP = function () {
        try {
            // tc129
            privates.IncludeTagCommander(privates.TCFileEnum.TC_3, function () {
                $(".getVpid").each(function (index) {
                    privates.ClickStandard(3, "Retour Web", "Retour_4|Confirmation La Poste", "Vente|" + $(this).val());
                });
            });
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };

    /**
    *
    *   Events parrainage
    **/
    publics.SendInvite = function (cat) {
        privates.ClickStandard(3, cat, "Parrainage|Email", "Invitation")
    };

    /**
    *
    *   Evenements de la page commandeDetail
    *   
    **/
    publics.InitCommandeDetail = function () {

        try {

            var sid = JsonOrder.saleId;

            //248
            $("#cph_middle_btCancelOrder").click(function () {
                privates.ClickStandard(3, "Commande non expediee", "Annulation", "Vente|" + sid);
            });
            //253
            $("#cph_middle_btCancelRedirect").click(function () {
                privates.ClickStandard(3, "Retour NPAI", "Annulation", "Vente|" + sid);
            });
            //256
            $("#cph_middle_btRequestRedirect").click(function () {
                privates.ClickStandard(3, "Retour NPAI", "Reexpedition", "Vente|" + sid);
            });
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };

    /**
    *
    *   Evenements suivi d'un colis
    *   
    **/
    publics.SuiviColis = function () {
        //251
        privates.ClickStandard(3, "Mes Commandes", "Suivi Colis", "Vente|" + JsonOrder.saleId);
    };

    /**
    *
    *   Evenements suivi retour/remboursement
    *   
    **/
    publics.SuiviRetour = function () {
        //252
        privates.ClickStandard(3, "Mes Commandes", "Suivi Retour", "Vente|" + JsonOrder.saleId);
    };

    /**
    *
    *   Evenements de l'iframe annulerCommande
    *   
    **/
    publics.InitAnnulerCommande = function () {

        try {

            //249
            $("#btCancel").click(function () {
                privates.ClickStandard(3, "Commande non expediee", "Annulation|Annuler 1", "Vente|" + sid);
            });
            //250
            $("#cph_content_btConfirm").click(function () {
                privates.ClickStandard(3, "Commande non expediee", "Annulation|Confirmer 1", "Vente|" + sid);
            });

            //259
            $("#btNo").click(function () {
                privates.ClickStandard(3, "Commande non expediee", "Annulation|Annuler 2", "Vente|" + sid);
            });

            //260
            $("#cph_content_btYes").click(function () {
                privates.ClickStandard(3, "Commande non expediee", "Annulation|Confirmer 2", "Vente|" + sid);
            });

        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };

    /**
    *
    *   Evenements de l'iframe annulerNpai
    *   
    **/
    publics.InitAnnulerNpai = function () {

        try {

            //254
            $("#btNo").click(function () {
                privates.ClickStandard(3, "Retour NPAI", "Annulation|Annuler", "Vente|" + sid);
            });
            //255
            $("#cph_content_btYes").click(function () {
                privates.ClickStandard(3, "Retour NPAI", "Annulation|Confirmer", "Vente|" + sid);
            });

        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };

    /**
    *
    *   Evenements de l'iframe reexpedierNpai
    *   
    **/
    publics.InitReexpedierNpai = function () {
        try {
            //257
            $("#btNo").click(function () {
                privates.ClickStandard(3, "Retour NPAI", "Reexpedition|Annuler", "Vente|" + sid);
            });
            //258
            $("#cph_content_btYes").click(function () {
                privates.ClickStandard(3, "Retour NPAI", "Reexpedition|Confirmer", "Vente|" + sid);
            });
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };

    /**
    *
    *   Evenements fiche produit vente demat
    *   
    **/
    publics.InitVenteDemat = function () {
        try {
            $(".fp__cta").click(function () {
                privates.ClickStandard(3, "Fiche Produit Demat", "Souscription", "Vente|" + $(this).data("saleid"));
            });
            $("#tabs-1 a:first").click(function () {
                privates.ClickStandard(3, "Fiche Produit Demat", "Lien Offre", "Vente|" + $(".fp__cta").data("saleid"));
            });
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };

    publics.InitLanding = function () {
        try {
            $(".LienInscription").click(function () {
                privates.ClickStandard(3, "Landing", "Compte SRP", "Inscription");
            });
            $(".LienLogin").click(function () {
                privates.ClickStandard(3, "Landing", "Compte SRP", "Connexion");
            });
            $(".btn-fb-connexion-tag").click(function () {
                privates.ClickStandard(3, "Landing", "Facebook Connect", "Connexion");
            });
            $(".btn-already-member-tag").click(function () {
                privates.ClickStandard(3, "Landing", "Header", "Connexion");
            });
            $(".btn-not-member-tag").click(function () {
                privates.ClickStandard(3, "Landing", "Header", "Inscription");
            });
            $(".btn-mdp-oublie-flag").click(function () {
                privates.ClickStandard(3, "Landing", "MDP", "MDP Oubli - Lien");
            });
            $(".btn-valider-flag").click(function () {
                privates.ClickStandard(3, "Landing", "MDP", "MDP Oubli - Envoi");
            });
            $(".field__passwordtoggle").click(function () {
                privates.ClickStandard(3, "Landing", "MDP", "MDP Afficher");
            });

        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };

    publics.InitMonCompte = function () {
        // tc41
        $(".savoir_plus").click(function () {
            privates.ClickStandard(3, "Mon Compte", "Infinity", "Infinity|" + 0);
        });
    };

    publics.InitMesCommandes = function () {
        try {
            $(".m-commande__suivis .link").click(function () {
                privates.ClickStandard(3, "Mes Commandes", "Suivi transporteur", "Vente|" + $(this).data("saleid"));
            });
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };

    publics.InitReservationDetail = function () {
        try {
            $(".tc304").click(function () {
                privates.ClickStandard(3, "Mes Commandes", "Telechargement Docs Voyage", "Vente|" + tc_vars.page_sale_id);
            });
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };

    // Select date change in AccueilVoyage
    publics.InitVorageDateDepart = function (date) {
        try {
            // 336
            privates.ClickStandard(3, "critereVoyage", "vacances", date);
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };


    /**
    *
    *   Evenements avis client
    *   
    **/
    publics.AvisClient = function (productId) {
        //252
        privates.ClickStandard(3, "Fiche Produit", "Avis clients", "Produit|" + productId);
    };

    /**
    *
    *   Evenements partage irl
    *   
    **/
    publics.ShareIrl = function (jContainer) {

        jContainer.find(".icon-facebook").click(function () {
            privates.ClickStandard(3, "Accueil irl", "Partage|Facebook", "Vente IRL");
        });
        jContainer.find(".icon-mail").click(function () {
            privates.ClickStandard(3, "Accueil irl", "Partage|Email", "Vente IRL");
        });
        jContainer.find(".icon-twitter").click(function () {
            privates.ClickStandard(3, "Accueil irl", "Partage|Twitter", "Vente IRL");
        });
        jContainer.find(".icon-google_plus").click(function () {
            privates.ClickStandard(3, "Accueil irl", "Partage|Google+", "Vente IRL");
        });
    };

    /**
    *
    *   Evenements navigation irl
    *   
    **/
    publics.NavigateIrl = function (category, subcategory) {
        privates.ClickStandard(3, "Navigation IRL", category, subcategory);
    };

    /**
    *
    *  Constructeur de la classe events
    *
    **/
    publics.init = function () {
        privates.LoadCommonEvents();
        publics.AuthenticateUser();
        publics.RegistrationUser();
        privates.LoadContainer();
    };
}(EVENTS_TC = {}));
// Fin de la classe EVENTS_TC

/**
*
*   Classes specifiques par tagsection
*   ----------------------------------
**/


(function (publics) {
    "use strict";
    var privates = {};

    publics.init = function () {
        EVENTS_TC.InitMonCompte();
    };
}(EVENTS_TC.moncompte = {}));

/**
*
*  mesfilleuls
*
**/
(function (publics) {
    "use strict";
    var privates = {};

    /**
    *
    *  Constructeur de la classe mesfilleuls
    *
    **/
    publics.init = function () {
        try {
            $('#tab3').click(function () { EVENTS_TC.InitRelanceFilleuls() })
            EVENTS_TC.InitFilleuls();
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };
}(EVENTS_TC.mesfilleuls = {}));

/**
*
*  mesnewsletters
*
**/
(function (publics) {
    "use strict";
    var privates = {};

    /**
    *
    *  Constructeur de la classe mesnewsletters
    *
    **/
    publics.init = function () {
        try {
            EVENTS_TC.InitMesNewsletters();
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };
}(EVENTS_TC.mesnewsletters = {}));

/**
*
*  ficheinfinity
*
**/
(function (publics) {
    "use strict";
    var privates = {};

    /**
    *
    *  Constructeur de la classe ficheinfinity
    *
    **/
    publics.init = function () {
        try {
            EVENTS_TC.InitFicheInfinity();
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };
}(EVENTS_TC.ficheinfinity = {}));

/**
*
*  iframe/ajoutpanier
*
**/
(function (publics) {
    "use strict";
    var privates = {};

    /**
    *
    *  Constructeur de la classe ficheinfinity
    *
    **/
    publics.init = function () {
        try {
            EVENTS_TC.ShowIncompatibilityCart();
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };
}(EVENTS_TC.ajoutpanier = {}));

/**
*
*  livraison
*
**/
(function (publics) {
    "use strict";
    var privates = {};

    /**
     *
     *  Fonction callback de l'appel à GetCart (init)
     *
     **/
    function OnSuccess(data) {
        try {
            EVENTS_TC.SendSalesToTc(data.Cart.sales, "panier_2");
            EVENTS_TC.EventsFromCartPerSale(data.Cart.sales, "2");

            /**
            *
            *  Evenement de clic sur "savoir plus"
            *
            **/
            $(".savoir_plus").click(function () {
                try {
                    EVENTS_TC.SavoirPlusEvents(data.Cart.sales.length > 1);
                } catch (e) {
                    SRP.ConsoleLog(e);
                }
            });
        }
        catch (e) {
            SRP.ConsoleLog(e);
        }
    }

    /**
    *
    *  Constructeur de la classe livraison
    *
    **/
    publics.init = function () {
        try {
            $.ajax({
                type: "POST",
                url: "/MonPanier/Ajax/GetCart.aspx",
                data: "",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: OnSuccess,
                failure: function (response) {
                    SRP.ConsoleLog(e);
                }
            });
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };
}(EVENTS_TC.livraison = {}));

/**
*
*  recapitulatif
*
**/
(function (publics) {
    "use strict";
    var privates = {};

    /**
    *
    *  Fonction callback de l'appel à GetCart (init)
    *
    **/
    function OnSuccess(data) {
        try {
            EVENTS_TC.SendSalesToTc(data.Cart.sales, "panier_3");
            EVENTS_TC.EventsFromCartPerSale(data.Cart.sales, "3");
        }
        catch (e) {
            SRP.ConsoleLog(e);
        }
    }

    /**
    *
    *  Constructeur de la classe recapitulatif
    *
    **/
    publics.init = function () {
        try {
            $.ajax({
                type: "POST",
                url: "/MonPanier/Ajax/GetCart.aspx",
                data: "",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: OnSuccess,
                failure: function (response) {
                    SRP.ConsoleLog(response.d);
                }
            });
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };
}(EVENTS_TC.recapitulatif = {}));

/**
*
*  livraisonexpress
*
**/
(function (publics) {
    "use strict";
    var privates = {};

    /**
    *
    *  Fonction callback de l'appel à GetCart (init)
    *
    **/
    function OnSuccess(data) {
        try {
            EVENTS_TC.SendSalesToTc(data.Cart.sales, "panier_2bm");
            EVENTS_TC.EventsFromCartPerSale(data.Cart.sales, "2bm");
        }
        catch (e) {
            SRP.ConsoleLog(e);
        }
    }

    /**
    *
    *  Constructeur de la classe livraisonexpress
    *
    **/
    publics.init = function () {
        try {
            $.ajax({
                type: "POST",
                url: "/MonPanier/Ajax/GetCart.aspx",
                data: "",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: OnSuccess,
                failure: function (response) {
                    SRP.ConsoleLog(response.d);
                }
            });
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };
}(EVENTS_TC.livraisonexpress = {}));

(function (publics) {
    "use strict";
    var privates = {};

    publics.init = function () {
        try {
            // panier vide à cette etape
            EVENTS_TC.EventFromConfirmation();
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };
}(EVENTS_TC.commandeconfirm = {}));

(function (publics) {
    "use strict";
    var privates = {};

    publics.init = function () {
        try {
            EVENTS_TC.AddSharedEvents();
            EVENTS_TC.AddToCart();
            EVENTS_TC.ShowProduct();
            EVENTS_TC.InitFicheProduit();
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };
}(EVENTS_TC.ficheproduit = {}));

(function (publics) {
    "use strict";
    var privates = {};

    publics.init = function () {
        try {
            EVENTS_TC.AddSharedEvents();
            EVENTS_TC.TripBooking();
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };
}(EVENTS_TC.ficheproduitvoyage = {}));

(function (publics) {
    "use strict";
    var privates = {};

    publics.init = function () {
        try {
            EVENTS_TC.InitDevis();
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };
}(EVENTS_TC.devis = {}));

(function (publics) {
    "use strict";
    var privates = {};

    publics.init = function () {
        try {
            EVENTS_TC.InitParticipants();
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };
}(EVENTS_TC.participants = {}));

(function (publics) {
    "use strict";
    var privates = {};

    publics.init = function () {
        try {
            EVENTS_TC.InitPaiement();
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };
}(EVENTS_TC.paiement = {}));

(function (publics) {
    "use strict";
    var privates = {};

    publics.init = function () {
        try {
            EVENTS_TC.AddSharedEvents();
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };
}(EVENTS_TC.ficheproduitvoyagev2 = {}));

(function (publics) {
    "use strict";
    var privates = {};

    publics.init = function () {
        try {
            EVENTS_TC.InitAccueilVoyage();
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };
}(EVENTS_TC.accueilvoyage = {}));

(function (publics) {
    "use strict";
    var privates = {};

    publics.init = function () {
        try {
            EVENTS_TC.InitAccueilBilletterie();
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };
}(EVENTS_TC.accueilbilletterie = {}));

(function (publics) {
    "use strict";
    var privates = {};

    publics.init = function () {
        try {
            EVENTS_TC.InitReservationConfirm();
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };
}(EVENTS_TC.reservationconfirm = {}));

//** Retour **//
(function (publics) {
    "use strict";
    var privates = {};

    publics.init = function () {
        try {
            EVENTS_TC.InitProduit();
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };
}(EVENTS_TC.produit = {}));

(function (publics) {
    "use strict";
    var privates = {};

    publics.init = function () {
        try {
            EVENTS_TC.InitProduitConfirmation();
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };
}(EVENTS_TC.produitconfirmation = {}));

(function (publics) {
    "use strict";
    var privates = {};

    publics.init = function () {
        try {
            EVENTS_TC.InitProduitFauteSRP();
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };
}(EVENTS_TC.produitfautesrp = {}));

(function (publics) {
    "use strict";
    var privates = {};

    publics.init = function () {
        try {
            EVENTS_TC.InitProduitFauteClient();
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };
}(EVENTS_TC.produitfauteclient = {}));

(function (publics) {
    "use strict";
    var privates = {};

    publics.init = function () {
        try {
            EVENTS_TC.InitProduitConfirmationMR();
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };
}(EVENTS_TC.produitconfirmationmr = {}));

(function (publics) {
    "use strict";
    var privates = {};

    publics.init = function () {
        try {
            EVENTS_TC.InitProduitConfirmationLP();
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };

}(EVENTS_TC.produitconfirmationlp = {}));

(function (publics) {
    "use strict";
    var privates = {};

    publics.init = function () {
        try {
            EVENTS_TC.InitCommandeDetail();
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };
}(EVENTS_TC.commandedetail = {}));

(function (publics) {
    "use strict";
    var privates = {};

    publics.init = function () {
        try {
            EVENTS_TC.InitAnnulerCommande();
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };
}(EVENTS_TC.annulercommande = {}));

(function (publics) {
    "use strict";
    var privates = {};

    publics.init = function () {
        try {
            EVENTS_TC.InitAnnulerNpai();
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };
}(EVENTS_TC.annulernpai = {}));

(function (publics) {
    "use strict";
    var privates = {};

    publics.init = function () {
        try {
            EVENTS_TC.InitReexpedierNpai();
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };
}(EVENTS_TC.reexpediernpai = {}));

(function (publics) {
    "use strict";
    var privates = {};

    publics.init = function () {
        try {
            EVENTS_TC.InitVenteDemat();
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };
}(EVENTS_TC.ventedemat = {}));

(function (publics) {
    "use strict";
    var privates = {};

    publics.init = function () {
        try {
            EVENTS_TC.InitLanding();
        } catch (e) {
            SRP.ConsoleLog(e);
        }
    };
}(EVENTS_TC.landing = {}));

