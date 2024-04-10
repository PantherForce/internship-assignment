$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
  const displayError = (inputField, message) => {
    $(inputField)
      .next(".warning-sign")
      .show()
      .attr("data-original-title", message);
  };

  const hideError = (inputField) => {
    $(inputField).next(".warning-sign").hide();
  };

  const checkFormInputs = () => {
    let formIsValid = true;
    $(".warning-sign").hide();

    ["annualIncome", "additionalIncome", "taxDeductions"].forEach((inputId) => {
      const inputValue = $("#" + inputId).val();
      if (isNaN(parseFloat(inputValue)) || !$.trim(inputValue)) {
        displayError("#" + inputId, "Enter a valid number");
        formIsValid = false;
      } else {
        hideError("#" + inputId);
      }
    });

    if (!$("#userAge").val()) {
      displayError("#userAge", "Please select your age group");
      formIsValid = false;
    } else {
      hideError("#userAge");
    }

    return formIsValid;
  };

  $("#incomeTaxCalculator").on("submit", function (event) {
    event.preventDefault();

    if (!checkFormInputs()) {
      return;
    }

    const annualIncome = parseFloat($("#annualIncome").val());
    const additionalIncome = parseFloat($("#additionalIncome").val());
    const taxDeductions = parseFloat($("#taxDeductions").val());
    const ageGroup = $("#userAge").val();

    let taxableIncome = annualIncome + additionalIncome - taxDeductions - 8;
    let taxPercentage = 0;

    switch (ageGroup) {
      case "<40":
        taxPercentage = 0.3;
        break;
      case "40-59":
        taxPercentage = 0.2;
        break;
      case ">=60":
        taxPercentage = 0.1;
        break;
      default:
        taxPercentage = 0;
    }

    let calculatedTax = taxableIncome > 0 ? taxableIncome * taxPercentage : 0;

    $(".modal-body").html(
      `Your overalll income will be: ${
        calculatedTax > 0 ? calculatedTax.toFixed(2) : 0
      } Lakhs after deduction`
    );
    $("#calculationResultModal").modal("show");
  });
});
