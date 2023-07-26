using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace GraphQLServer.TokenService
{
    public class JwtTokenService
    {
        private readonly TokenValidationParameters _tokenValidationParameters;

        public JwtTokenService(TokenValidationParameters tokenValidationParameters)
        {
            _tokenValidationParameters = tokenValidationParameters;
        }

        public string GetRoleFromToken(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadToken(token) as JwtSecurityToken;

            // Get the "role" claim from the token's claims
            var roleClaim = jwtToken?.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Role);

            return roleClaim?.Value;
        }

        public bool IsTokenValid(string jwtToken)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            try
            {
                SecurityToken validatedToken;
                var claimsPrincipal = tokenHandler.ValidateToken(jwtToken, _tokenValidationParameters, out validatedToken);

                // At this point, the token is valid and hasn't expired.
                // You can access the claims if needed using claimsPrincipal.Claims.

                return true;
            }
            catch (SecurityTokenException)
            {
                // The token is invalid, has expired, or failed other validation checks.
                return false;
            }
            catch (Exception)
            {
                // Any other unexpected exception during token validation.
                // Handle or log the error as needed.
                return false;
            }
        }
    }
}
