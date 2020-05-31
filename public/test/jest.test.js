describe("Test block", function() {
   'use strict';

   test('Test name and description', function() {
      // arrange
      let variable = 1;

      // act
      variable += 1;

      //assert
      expect(variable).toBe(2);
   });
});
