function getCompany(company) {
    switch (String(company).toUpperCase()) {
    case 'CHI':
    case 'CHUMS':
        return 'chums';
    case 'BCS':
    case 'BC':
        return 'bc';
    }
    return company;
}

function getSageCompany(company) {
    switch (String(company).toLowerCase()) {
    case 'chums':
    case 'chi':
        return 'CHI';
    case 'bc':
    case 'bcs':
        return 'BCS';
    }
    return company;
}

exports.getCompany = getCompany;
exports.getSageCompany = getSageCompany;
