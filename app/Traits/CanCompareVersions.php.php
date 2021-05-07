<?php namespace Vanderbilt\AdvancedImport\App\Traits;

trait CanCompareVersions {

	/**
     * extract major, minor and patch as integeres from a provided version string
     *
     * @param string $versionString
     * @return array [major=>int, minor=>int, patch=>int];
     */
    private function getSemanticVersioning($versionString)
    {
        $regExp = "/(?<major>\d+)(?:\.(?<minor>\d+))?(?:\.(?<patch>\d+))?/";
        preg_match($regExp, $versionString, $matches);
        $versioning = [
            'major' => intval(@$matches['major']),
            'minor' => intval(@$matches['minor']),
            'patch' => intval(@$matches['patch']),
        ];
        return $versioning;
    }

	/**
	 * compare two string versions.
	 * Returns
	 * 	- < 0 if version_A is less than version_B;
	 * 	- > 0 if version_A is greater than version_B
	 * 	- 0 if they are equal.
	 *
	 * @param string $version_A
	 * @param string $version_B
	 * @return int 
	 */
	public function compareVersions($version_A, $version_B)
	{
		$orderedVersionTypes = ['major','minor','patch'];
		$versioningA = $this->getSemanticVersioning($version_A);
		$versioningB = $this->getSemanticVersioning($version_B);
		foreach ($orderedVersionTypes as $type) {
			if(@$versioningA[$type]>@$versioningB[$type]) return -1;
			if(@$versioningA[$type]<@$versioningB[$type]) return 1;
		}
		return 0;
	}

}