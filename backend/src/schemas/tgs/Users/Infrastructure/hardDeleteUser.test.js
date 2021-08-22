const hardDeleteUser = require("./hardDeleteUser")
// @ponicode
describe("hardDeleteUser.default", () => {
    test("0", () => {
        let callFunction = () => {
            hardDeleteUser.default({ db: "0x8acec639cccfdbd9b1ac999c26f4ddab5e93effd", core: "image" }, "proj_")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            hardDeleteUser.default({ db: "0xe2d81098e6a4bf38eecdcb5684199b1a79ed943d", core: "application" }, 2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            hardDeleteUser.default({ db: "0xe2d81098e6a4bf38eecdcb5684199b1a79ed943d", core: "application" }, "projectId-1969970175")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            hardDeleteUser.default({ db: "0xeb8f8db6baafd1155f89a03bef4cb01029e6bbea", core: "audio" }, "projectId-1969970175")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            hardDeleteUser.default({ db: "0x1aeb62feff1eca2953a0db8fe78ffbbd601df609", core: "text" }, "YOUR_PROJECT_ID")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            hardDeleteUser.default(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
