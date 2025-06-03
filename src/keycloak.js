import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'http://localhost:4000/',
  realm: 'realmsfe',
  clientId: 'sfeclient'
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;