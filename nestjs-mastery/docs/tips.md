UseCase of nestjs core components: 
  1. Pipes: To validate/transform single parameter/query values on controller. (e.g, User input validation for api version, validate if a value is uuid or not, etc. )
  2. Dto: For bigger object/multiple values as parameter/query/body values on controller. (e.g, Body, query values with transform, etc.) 
  3. Guards: Use this to protect a controller conditionally. (e.g, Provide access to an api endpoint for PREMIUM customers, expose endpoint to API-V2 users only, etc.)
  4. Custom decorator: Use this when you need full control over parameters/method/class. (e.g, @ApiRequester, @User on param, @SetAllowedRoles on controller methods, @deprecatedMethod - this type of decorator can be very useful at the time of developing SDK)
  5. 