
function useStats(students) {

    const total = students.length;

    const passed = students.filter(
        student => student.result === "Pass"
    ).length;

    const failed = students.filter(
        student => student.result === "Fail"
    ).length;

    const average = total > 0
        ? (
            students.reduce(
                (sum, student) =>
                    sum + Number(student.percentage || 0),
                0
            ) / total
        ).toFixed(2)
        : 0;

    const topper = total > 0
        ? students.reduce((highest, current) =>
            Number(current.total) > Number(highest.total)
                ? current
                : highest
        )
        : null;

    return {
        total,
        passed,
        failed,
        average,
        topper
    };
}

export default useStats;
