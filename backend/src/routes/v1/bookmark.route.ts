import express, { Request, Response } from "express";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const data = [
      {
        id: 1,
        name: "Apps",
        sort: 1,
        items: [
          {
            id: 1,
            name: "Vaultwarden",
            url: "https://bw.uripsub.dev/",
            sort: 1,
            icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/bitwarden.svg",
          },
          {
            id: 2,
            name: "Adguard",
            url: "https://adguard.uripsub.dev/",
            sort: 2,
            icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/adguard-home.svg",
          },
          {
            id: 3,
            name: "Daily Expense",
            url: "https://dew.uripsub.dev/",
            sort: 3,
            icon: "https://dew.uripsub.dev/icon.svg",
          },
          {
            id: 4,
            name: "Blog",
            url: "https://blog.uripsub.dev/",
            sort: 4,
            icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/ghost-light.png",
          },
          {
            id: 5,
            name: "Darwin InOut",
            url: "https://darwin1309.uripsub.dev/",
            sort: 5,
            icon: "https://cdn-images-1.medium.com/v2/resize:fit:1200/1*7QHmE3Q4EW_fSqpGOpcyrg.png",
          },
          {
            id: 6,
            name: "uBrain",
            url: "https://ubrain.uripsub.dev/",
            sort: 6,
            icon: "https://www.svgrepo.com/download/353662/docusaurus.svg",
          },
          {
            id: 7,
            name: "Ghea",
            url: "https://ghea.uripsub.dev/_/",
            sort: 7,
            icon: "https://seeklogo.com/images/P/pocketbase-logo-CA73994F09-seeklogo.com.png",
          },
          {
            id: 8,
            name: "Droppy",
            url: "https://droppy.uripsub.dev/",
            sort: 8,
            icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/droppy.svg",
          },
          {
            id: 9,
            name: "Code",
            url: "https://code.uripsub.dev/",
            sort: 9,
            icon: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/svg/vscode.svg",
          },
        ],
      },
    ];

    res.json({
      success: true,
      data,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
