import React, { useEffect, useState } from "react";
import { Button, Link } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { styled } from "@mui/material/styles";

const GithubButton = styled(Button)`
  background: white;
  color: black;
  height: 30px;
`;

interface GithubResponse {
  id: number;
  stargazers_count: number;
}
export const GithubBadge: React.FC = () => {
  const [result, setResult] = useState<GithubResponse | null>(null);
  useEffect(() => {
    fetch("https://api.github.com/repos/bordeux/meshmonitor")
      .then((res) => res.json())
      .then(setResult);
  }, []);

  const stars = result?.stargazers_count || 0;

  return (
    <Link href="https://github.com/bordeux/meshmonitor" target="_blank">
      <GithubButton startIcon={<GitHubIcon />}>{stars} Stars</GithubButton>
    </Link>
  );
};
