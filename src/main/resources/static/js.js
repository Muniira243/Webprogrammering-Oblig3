$(function (){
    hentAlle();
});
function regbillett() {
    const billett = {
        film: $("#film").val(),
        antall: $("#antall").val(),
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        telefonnr: $("#telefonnr").val(),
        epost: $("#epost").val()
    };

    if (validerBillett(billett)) {
        $.post({
            url: "/lagre",
            contentType: "application/json",
            data: JSON.stringify(billett),
            success: function () {
                hentAlle();
            }
        });

        $("#film").val("");
        $("#antall").val("");
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#telefonnr").val("");
        $("#epost").val("");
    } else {
        $("#utBillett").html("Fyll ut alle felter og rett alle feil i skjemaet før innsending!");
    }
}
function hentAlle() {
    $.get("/hentAlle", function (billetter) {
        formaterBilletter(billetter);
    });
}

function formaterBilletter(billetter) {
    console.log(billetter.telefonnr);
    let ut = "<table class='table table-striped'><tr>" +
        "<th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnr</th><th>Epost</th>" +
        "</tr>";
    billetter.forEach(function (billett) {
        ut += "<tr><td>" + billett.film + "</td><td>" + billett.antall + "</td><td>" +
            billett.fornavn + "</td><td>" + billett.etternavn + "</td><td>" + billett.telefonnr +
            "</td><td>" + billett.epost + "</td></tr>";
    });
    ut += "</table>";
    $("#utBillett").html(ut);
}
function validerFilm(film) {
    if (film) {
        $("#feilFilm").html("");
        return true;
    } else {
        $("#feilFilm").html("Velg film")
        return false;
    }
}

function validerAntall(antall) {
    let regex = /^[1-9]\d*$/
    if (regex.test(antall)) {
        $("#feilAntall").html("");
        return true;
    } else {
        $("#feilAntall").html("Kun bruk helltall");
        return false;
    }
}

function validerFornavn(fornavn) {
    let regex = /^[A-ZÆØÅa-zæøå]{2,50}/;
    if (regex.test(fornavn)) {
        $("#feilFornavn").html("");
        return true;
    } else {
        $("#feilFornavn").html("Bruk kun store og små bokstaver, -og mellomrom");
        return false;
    }
}
function validerEtternavn(etternavn) {
    let regex = /^[A-ZÆØÅa-zæøå]{2,50}/;
    if (regex.test(etternavn)) {
        $("#feilEtternavn").html("");
        return true;
    } else {
        $("#feilEtternavn").html("Bruk kun store og små bokstaver, -og mellomrom");
        return false;
    }
}
function validerTelefon(telefonnr) {
    let regex = /^[1-9]{8}$/;
    if (regex.test(telefonnr)) {
        $("#feilTelefonnr").html("");
        return true;
    } else {
        $("#feilTelefonnr").html("Skriv inn gyldig telefonnummer");
        return false;
    }
}

function validerEpost(epost) {
    let regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (regex.test(epost)) {
        $("#feilEpost").html("");
        return true;
    } else {
        $("#feilEpost").html("Skriv inn gyldig e-postadresse");
        return false;
    }
}

function validerBillett(billett) {
    let telefonOK = validerTelefon(billett.telefonnr);
    let epostOK = validerEpost(billett.epost);
    let fornavnOK = validerFornavn(billett.fornavn);
    let etternavnOK = validerEtternavn(billett.etternavn);
    let antallOK = validerAntall(billett.antall);
    let filmOK = validerFilm(billett.film);
    return telefonOK && epostOK && fornavnOK && etternavnOK && antallOK && filmOK;
}
function slettAlle() {
    $.get("/slettAlle", function () {
        hentAlle();
    });
}
