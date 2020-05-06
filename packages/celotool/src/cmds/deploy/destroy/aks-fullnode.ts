import { DestroyArgv } from 'src/cmds/deploy/destroy'
import { removeHelmRelease } from 'src/lib/aks-fullnode'
import {
  OracleArgv,
  addOracleMiddleware,
  getAzureClusterConfig,
  getOracleAzureContext,
  switchToAzureContextCluster,
} from 'src/lib/oracle'
import yargs from 'yargs'

export const command = 'oracle-fullnode'

export const describe = 'destroy the full-node(s) on an AKS cluster'

type OracleFullNodeDestroyArgv = DestroyArgv & OracleArgv

export const builder = (argv: yargs.Argv) => {
  return addOracleMiddleware(argv)
}

export const handler = async (argv: OracleFullNodeDestroyArgv) => {
  const oracleAzureContext = getOracleAzureContext(argv.primary)
  await switchToAzureContextCluster(oracleAzureContext, argv.celoEnv)
  const clusterConfig = getAzureClusterConfig(oracleAzureContext)
  await removeHelmRelease(argv.celoEnv, clusterConfig)
}
