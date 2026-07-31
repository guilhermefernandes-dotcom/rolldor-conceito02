function URLToArray(url) {

    var request = {};

    if (url.indexOf('?') !== -1) {

        url = encodeURI(url);

        var pairs = url.substring(url.indexOf('?') + 1).split('&');

        for (var i = 0; i < pairs.length; i++) {

            if (!pairs[i]) continue;

            var pair = pairs[i].split('=');

            if (pair[1] == undefined || pair[1] == '') { request[decodeURIComponent(pair[0])] = ''; }

            else {

                try { request[decodeURIComponent(pair[0])] = decodeURIComponent(unescape(pair[1])); }

                catch (e) { request[decodeURIComponent(pair[0])] = pair[1]; }

            }

        }

    }

    return request;

}

/* Campos para integração */

function CamposUTM(modal) {

    if (modal == undefined) { modal = false; }

    /* Formulários */

    let formularios = Array.from(document.querySelectorAll((modal ? '.gpc_modal ' : '') + 'form'));

    utm = URLToArray(window.location.href);

    let link_usar = '';

    if (Object.entries(utm).length) {

        for (var [key, value] of Object.entries(utm)) { link_usar += key + '=' + value + '&'; }

        if (link_usar.length) { link_usar = link_usar.substr(0, (link_usar.length - 1)); }

    }

    formularios.map(formulario => {

        /* Controle de get utm_source */

        $(formulario).find('.gpc_campo').each(function (i, campo) {

            let valor = $(campo).val();

            if (valor.indexOf('{') != -1 && valor.indexOf('}') != -1) {

                let valor_limpo = valor.replace('{', '').replace('}', '');

                utm.hasOwnProperty(valor_limpo) ? $(campo).val(utm[valor_limpo]) : $(campo).val('');

            }

        });

        let botao = $(formulario).find('.gpc_botao');

        if (botao.attr('gpc-link') !== undefined && botao.attr('gpc-link') !== '') {

            try {

                let link_new = new URL(botao.attr('gpc-link'));

                for (var [key, value] of Object.entries(utm)) { link_new.searchParams.set(key, value); }

                botao.attr('gpc-link', `${link_new.toString()}`);

            } catch (error) {

                let concatenar = '?';

                if (botao.attr('gpc-link').indexOf('?') !== -1) { concatenar = '&'; }

                botao.attr('gpc-link', botao.attr('gpc-link') + concatenar + link_usar);

            }

        }

    });

    /* Botões */

    if (link_usar != '') {

        /* Habilitar para boões expecificos */

        let botoes = Array.from(document.querySelectorAll((modal ? '.gpc_modal ' : '') + '.link_externo'));

        botoes.map(link => {

            /* Controle de get utm_source */

            $(link).each(function (i, href) {

                if ($(href).attr('href') !== undefined && $(href).attr('href') !== '') {

                    try {

                        let link_new = new URL($(href).attr('href'));

                        for (var [key, value] of Object.entries(utm)) { link_new.searchParams.set(key, value); }

                        $(href).attr('href', `${link_new.toString()}`);

                    } catch (error) {

                        let concatenar = '?';

                        if ($(href).attr('href').indexOf('?') !== -1) { concatenar = '&'; }

                        $(href).attr('href', $(href).attr('href') + concatenar + link_usar);

                    }

                }

            });

        });

    }

}

CamposUTM();

$('body').on('click', '.link_popup', function () { setTimeout(() => { CamposUTM(true); }, 200); });
