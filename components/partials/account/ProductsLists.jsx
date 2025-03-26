export function addPeriodToThousands (number) {
    const numStr = String(number);

    const [integerPart, decimalPart] = numStr.split('.');

    const formattedIntegerPart = integerPart.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ' '
    );

    const formattedNumber =
        decimalPart !== undefined
            ? `${formattedIntegerPart}.${decimalPart}`
            : formattedIntegerPart;

    return formattedNumber;
}
